// components/ContactCallout.jsx
import React from 'react';
import { PortableText } from '@portabletext/react';
import '../styles/ContactCallout.css';

const ContactCallout = ({ title, description, cta }) => {
  return (
    <section className="contact-callout">
      <div className="contact-callout__content">
        <div className="callout-body">

          {/* LEFT */}
          <div className="callout-body-left">
            {title && (
              <h2 className="contact-callout__title">{title}</h2>
            )}
          </div>

          {/* RIGHT */}
          <div className="callout-body-right">
            {description && (
              <div className="contact-callout__description">
                <PortableText value={description} />
              </div>
            )}

            {/* ✅ BUTTON FIX */}
            {cta?.label && cta?.url && (
              <a
                href={cta.url}
                target={cta.target || '_self'}
                rel={cta.target === '_blank' ? 'noopener noreferrer' : undefined}
                className="contact-callout__button"
              >
                {cta.label}
                <span className="arrow">→</span>
              </a>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactCallout;