import React from 'react';

interface TextEffectProps {
  text: string;
  className?: string;
  delay?: number;
  as?: any;
  gradient?: boolean;
}

const TextEffect: React.FC<TextEffectProps> = ({ 
  text, 
  className = '', 
  delay = 0,
  as: Tag = 'div',
  gradient = false
}) => {
  // Split text into words
  const words = text.split(' ');

  return (
    <Tag className={`${className} ${gradient ? 'animate-gradient-xy' : ''}`}>
      <span className="sr-only">{text}</span>
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block whitespace-pre opacity-0 animate-fade-in-up"
          style={{
            animationDelay: `${delay + index * 100}ms`,
            animationFillMode: 'forwards'
          }}
        >
          {word}&nbsp;
        </span>
      ))}
    </Tag>
  );
};

export default TextEffect;