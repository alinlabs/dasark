import React, { useRef, useLayoutEffect, useCallback, useEffect } from 'react';

interface AutoResizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  minRows?: number;
}

export const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({
  value,
  minRows = 1,
  className = '',
  onChange,
  style,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;

    // Reset height to 'auto' to accurately read scrollHeight
    el.style.height = 'auto';
    
    // Set to scrollHeight
    const nextHeight = el.scrollHeight;
    if (nextHeight > 0) {
      el.style.height = `${nextHeight}px`;
    }
  }, []);

  useLayoutEffect(() => {
    resize();
  }, [value, resize]);

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [resize]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    resize();
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <textarea
      ref={textareaRef}
      rows={minRows}
      value={value}
      onChange={handleChange}
      className={`resize-none overflow-hidden block ${className}`}
      style={{
        minHeight: minRows === 1 ? '20px' : `${minRows * 20}px`,
        lineHeight: '1.4',
        boxSizing: 'border-box',
        ...style,
      }}
      {...props}
    />
  );
};
