import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const colorCache = new Map<string, string>();

/**
 * Converts modern CSS color functions (oklab, oklch, lab, lch, color, light-dark)
 * to hex/rgb via canvas 2D context so html2canvas will never encounter unsupported functions.
 */
export const convertModernColorToRgb = (colorStr: string): string => {
  if (!colorStr) return '#000000';
  const trimmed = colorStr.trim();
  if (colorCache.has(trimmed)) {
    return colorCache.get(trimmed)!;
  }

  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return '#1e293b';
    }

    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#000000';
    ctx.fillStyle = trimmed;
    const converted = ctx.fillStyle;

    // Check if the browser converted it to rgb(...) or #rrggbb
    if (
      converted &&
      !converted.includes('okl') &&
      !converted.includes('lab') &&
      !converted.includes('color(') &&
      !converted.includes('light-dark')
    ) {
      colorCache.set(trimmed, converted);
      return converted;
    }
  } catch {
    // fallback
  }

  // Heuristic fallbacks if canvas couldn't parse
  let fallback = '#1e293b';
  const lower = trimmed.toLowerCase();
  if (lower.includes('white') || lower.includes('100%') || lower.includes('0.9') || lower.includes('0.85')) {
    fallback = '#ffffff';
  } else if (lower.includes('black') || lower.includes('0%') || lower.includes('0.05')) {
    fallback = '#0f172a';
  } else if (lower.includes('blue')) {
    fallback = '#2563eb';
  } else if (lower.includes('emerald') || lower.includes('green')) {
    fallback = '#059669';
  } else if (lower.includes('rose') || lower.includes('red')) {
    fallback = '#e11d48';
  } else if (lower.includes('amber') || lower.includes('yellow')) {
    fallback = '#d97706';
  }

  colorCache.set(trimmed, fallback);
  return fallback;
};

/**
 * Sanitizes CSS text by replacing all instances of modern color functions:
 * oklab(...), oklch(...), lab(...), lch(...), color(...), light-dark(...)
 * Handles nested color functions iteratively.
 */
export const sanitizeCssColors = (css: string): string => {
  if (!css) return '';

  const pattern = /(?:oklab|oklch|lab|lch|hwb|color|light-dark)\([^()]+\)/gi;
  let result = css;
  let iterations = 0;

  while (pattern.test(result) && iterations < 5) {
    result = result.replace(pattern, (match) => convertModernColorToRgb(match));
    iterations++;
  }

  return result;
};

/**
 * CORS Handler: Converts an image URL into a Base64 Data URL
 * using Fetch API with CORS mode to prevent canvas tainting.
 */
export const fetchImageAsBase64WithCors = async (url: string): Promise<string> => {
  try {
    if (url.startsWith('data:')) return url;

    // 1. Direct CORS fetch attempt
    try {
      const response = await fetch(url, {
        mode: 'cors',
        credentials: 'omit',
        headers: {
          Accept: 'image/*',
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(typeof reader.result === 'string' ? reader.result : url);
          };
          reader.onerror = () => resolve(url);
          reader.readAsDataURL(blob);
        });
      }
    } catch {
      // Direct fetch failed, attempt server CORS proxy
    }

    // 2. Fallback to server-side /api/cors-proxy endpoint
    if (typeof window !== 'undefined') {
      const resolvedUrl = url.startsWith('http') ? url : new URL(url, window.location.origin).href;
      const proxyUrl = `/api/cors-proxy?url=${encodeURIComponent(resolvedUrl)}`;
      const proxyRes = await fetch(proxyUrl);
      if (proxyRes.ok) {
        const blob = await proxyRes.blob();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(typeof reader.result === 'string' ? reader.result : url);
          };
          reader.onerror = () => resolve(url);
          reader.readAsDataURL(blob);
        });
      }
    }

    return url;
  } catch (error) {
    console.warn('[CORS Handler] Image fetch failed, retaining original src:', url, error);
    return url;
  }
};

/**
 * Pre-processes all images in an element tree to ensure CORS compliance:
 * 1. Sets crossOrigin = 'anonymous'
 * 2. Inlines external/relative images as Base64 Data URLs so canvas is never tainted
 */
export const sanitizeImagesWithCors = async (rootEl: HTMLElement): Promise<void> => {
  const images = Array.from(rootEl.querySelectorAll('img'));
  await Promise.all(
    images.map(async (img) => {
      img.crossOrigin = 'anonymous';
      const currentSrc = img.getAttribute('src');
      if (currentSrc && !currentSrc.startsWith('data:')) {
        try {
          const base64Src = await fetchImageAsBase64WithCors(currentSrc);
          if (base64Src && base64Src.startsWith('data:')) {
            img.setAttribute('src', base64Src);
          }
        } catch {
          // keep fallback
        }
      }
    })
  );
};

export const prepareClonedDocForCanvas = (clonedDoc: Document, clonedElement: HTMLElement) => {
  // 1. Process and sanitize all <style> tags in the cloned document
  const styleTags = Array.from(clonedDoc.querySelectorAll('style'));
  styleTags.forEach((styleTag) => {
    if (styleTag.textContent) {
      styleTag.textContent = sanitizeCssColors(styleTag.textContent);
    }
  });

  // 2. In-line and sanitize any external <link rel="stylesheet"> tags if readable
  const linkTags = Array.from(clonedDoc.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'));
  linkTags.forEach((link) => {
    try {
      const matchingSheet = Array.from(document.styleSheets).find(
        (s) => s.href === link.href || (link.getAttribute('href') && s.href?.includes(link.getAttribute('href')!))
      );
      if (matchingSheet) {
        try {
          const rules = Array.from(matchingSheet.cssRules)
            .map((r) => r.cssText)
            .join('\n');
          const style = clonedDoc.createElement('style');
          style.textContent = sanitizeCssColors(rules);
          link.parentNode?.replaceChild(style, link);
        } catch {
          // cross-origin stylesheet
        }
      }
    } catch {
      // ignore
    }
  });

  // 3. Process inline styles and computed styles for all elements in the cloned tree
  const view = clonedDoc.defaultView || window;
  const allElements = Array.from(clonedElement.querySelectorAll<HTMLElement>('*'));
  allElements.concat(clonedElement).forEach((el) => {
    if (el.tagName.toLowerCase() === 'img') {
      (el as HTMLImageElement).crossOrigin = 'anonymous';
    }

    // Sanitize element inline styles
    const inlineStyle = el.getAttribute('style');
    if (inlineStyle) {
      const sanitizedInline = sanitizeCssColors(inlineStyle);
      if (sanitizedInline !== inlineStyle) {
        el.setAttribute('style', sanitizedInline);
      }
    }

    // Sanitize any computed properties that html2canvas queries
    try {
      const computed = view.getComputedStyle(el);
      const colorProps = [
        'backgroundColor',
        'color',
        'borderColor',
        'borderTopColor',
        'borderBottomColor',
        'borderLeftColor',
        'borderRightColor',
        'outlineColor',
        'fill',
        'stroke',
      ];
      colorProps.forEach((prop) => {
        const val = (computed as any)[prop];
        if (
          typeof val === 'string' &&
          (val.includes('okl') || val.includes('lab') || val.includes('color('))
        ) {
          const converted = convertModernColorToRgb(val);
          el.style.setProperty(
            prop.replace(/([A-Z])/g, '-$1').toLowerCase(),
            converted,
            'important'
          );
        }
      });
    } catch {
      /* ignore computed style errors */
    }
  });
};

/**
 * PDF Generation Engine using jsPDF 4.2.1 + html2canvas with full CORS handling
 */
export const exportElementToPdf = async (
  element: HTMLElement,
  filename: string
): Promise<void> => {
  // 1. Execute CORS Sanitization & Pre-loading on images
  await sanitizeImagesWithCors(element);

  // 2. Capture clean canvas via html2canvas with CORS mode
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: false,
    imageTimeout: 15000,
    backgroundColor: '#ffffff',
    logging: false,
    windowWidth: 1024,
    onclone: (clonedDoc, clonedElement) => {
      prepareClonedDocForCanvas(clonedDoc, clonedElement);
    },
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.95);

  // 3. Instantiate jsPDF 4.2.1 Engine
  const PDFConstructor = (jsPDF as any).default || jsPDF;
  const pdf = new PDFConstructor({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  // Set document metadata in jsPDF
  pdf.setProperties({
    title: filename.replace('.pdf', ''),
    subject: 'Laporan Audit K3-HR DASAR · PT. DAME ALAM SEJAHTERA',
    author: 'DAS Audit & Risk (DASAR)',
    keywords: 'SMK3, ISO 45001, Audit, K3, Ketenagakerjaan, CAPA',
    creator: 'PDF Generation Engine jsPDF 4.2.1',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
  const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm
  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  // Add first page
  pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
  heightLeft -= pdfHeight;

  // Multi-page handling
  while (heightLeft > 5) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;
  }

  // Save the built PDF
  pdf.save(filename);
};
