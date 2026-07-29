/* ============================================
   Category Icon Resolver
   DIU Student Welfare System
   ============================================ */

import React from 'react';
import {
  Squares2X2Icon,
  DocumentTextIcon,
  WrenchScrewdriverIcon,
  UserGroupIcon,
  TrophyIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  MegaphoneIcon,
} from '@heroicons/react/24/outline';

export function getCategoryIcon(category: string, size = 16): React.ReactNode {
  const style = { width: size, height: size };
  switch (category) {
    case 'exam-notice':
      return <DocumentTextIcon style={style} />;
    case 'workshop':
      return <WrenchScrewdriverIcon style={style} />;
    case 'seminar':
      return <UserGroupIcon style={style} />;
    case 'competition':
      return <TrophyIcon style={style} />;
    case 'scholarship':
      return <AcademicCapIcon style={style} />;
    case 'internship':
      return <BriefcaseIcon style={style} />;
    case 'all':
      return <Squares2X2Icon style={style} />;
    default:
      return <MegaphoneIcon style={style} />;
  }
}
