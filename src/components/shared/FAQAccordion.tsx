/* ============================================
   FAQAccordion Component
   DIU Student Welfare System
   ============================================ */

import { useState } from 'react';
import { ChevronDownIcon, EyeIcon } from '@heroicons/react/24/outline';
import { TICKET_CATEGORIES } from '../../utils/constants';
import { slugToLabel } from '../../utils/helpers';
import type { FAQItem } from '../../types';
import styles from './FAQAccordion.module.css';

interface FAQAccordionProps {
  item: FAQItem;
  defaultExpanded?: boolean;
}

export function FAQAccordion({ item, defaultExpanded = false }: FAQAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultExpanded);

  const categoryLabel =
    TICKET_CATEGORIES.find((c) => c.value === item.category)?.label || slugToLabel(item.category);

  return (
    <div className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}>
      <button
        type="button"
        className={styles.header}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <div className={styles.questionGroup}>
          <span className={styles.questionText}>{item.question}</span>
          <div className={styles.headerMeta}>
            <span className={styles.categoryBadge}>{categoryLabel}</span>
            <span className={styles.views}>
              <EyeIcon style={{ width: 14, height: 14 }} /> {item.viewCount} views
            </span>
          </div>
        </div>
        <ChevronDownIcon
          style={{ width: 18, height: 18 }}
          className={`${styles.chevron} ${isOpen ? styles.rotate : ''}`}
        />
      </button>

      {isOpen && (
        <div className={styles.contentBody}>
          <p className={styles.answerText}>{item.answer}</p>
        </div>
      )}
    </div>
  );
}
