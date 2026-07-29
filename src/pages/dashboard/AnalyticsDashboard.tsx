/* ============================================
   AnalyticsDashboard Page — Admin & HoD Console
   DIU Student Welfare System
   ============================================ */

import {
  QuestionMarkCircleIcon,
  CheckBadgeIcon,
  MegaphoneIcon,
  ExclamationCircleIcon,
  ArrowUpRightIcon,
} from '@heroicons/react/24/outline';
import { mockAnalyticsData, departmentalImpactMetrics } from '../../data/mockAnalytics';
import { TICKET_CATEGORIES } from '../../utils/constants';
import styles from './AnalyticsDashboard.module.css';

export default function AnalyticsDashboard() {
  const { totalTickets, unresolvedTickets, counsellingRequests, announcementsPosted, ticketsByCategory, monthlyTrends, topProblems } = mockAnalyticsData;

  // Max category count for bar scale
  const maxCategoryCount = Math.max(...Object.values(ticketsByCategory));
  const maxTrendCount = Math.max(...monthlyTrends.map((t) => t.count));

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Departmental Analytics & Insights</h1>
          <p className={styles.subtitle}>
            Decision-making data and performance metrics for the Software Engineering Department Head & Administrators.
          </p>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statIcon} style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary)' }}>
              <QuestionMarkCircleIcon style={{ width: 22, height: 22 }} />
            </div>
            <span className={styles.statTrendUp}>+14% this month</span>
          </div>
          <div className={styles.statValue}>{totalTickets}</div>
          <div className={styles.statLabel}>Total Support Tickets</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statIcon} style={{ background: 'var(--color-warning-bg)', color: 'var(--color-warning)' }}>
              <ExclamationCircleIcon style={{ width: 22, height: 22 }} />
            </div>
            <span className={styles.statTrendWarning}>Requires Rep Action</span>
          </div>
          <div className={styles.statValue}>{unresolvedTickets}</div>
          <div className={styles.statLabel}>Unresolved / In-Progress Issues</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statIcon} style={{ background: 'var(--color-success-bg)', color: 'var(--color-success)' }}>
              <CheckBadgeIcon style={{ width: 22, height: 22 }} />
            </div>
            <span className={styles.statTrendUp}>+22% this month</span>
          </div>
          <div className={styles.statValue}>{counsellingRequests}</div>
          <div className={styles.statLabel}>1-on-1 Counselling Sessions</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statIcon} style={{ background: 'var(--color-info-bg)', color: 'var(--color-info)' }}>
              <MegaphoneIcon style={{ width: 22, height: 22 }} />
            </div>
            <span className={styles.statMetaText}>Department-wide</span>
          </div>
          <div className={styles.statValue}>{announcementsPosted}</div>
          <div className={styles.statLabel}>Published Announcements</div>
        </div>
      </div>

      {/* Executive Impact Metrics Proposal */}
      <section className={styles.executivePanel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Departmental Impact & Accreditation Proposal</h2>
          <p className={styles.panelDesc}>
            Data-backed metrics demonstrating student satisfaction, problem resolution speed, and outcome improvements.
          </p>
        </div>

        <div className={styles.impactGrid}>
          {departmentalImpactMetrics.map((item, idx) => (
            <div key={idx} className={styles.impactCard}>
              <span className={styles.impactPillar}>{item.pillar}</span>
              <h3 className={styles.impactFeature}>{item.feature}</h3>
              <div className={styles.impactResult}>
                <ArrowUpRightIcon style={{ width: 14, height: 14 }} className={styles.resultArrow} />
                <span>{item.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Data Breakdown */}
      <div className={styles.chartsGrid}>
        {/* Category Breakdown Bar Chart */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Tickets by Category</h3>
            <p className={styles.chartSub}>Distribution of student inquiries across core platforms</p>
          </div>

          <div className={styles.barList}>
            {Object.entries(ticketsByCategory).map(([catValue, count]) => {
              const catLabel = TICKET_CATEGORIES.find((c) => c.value === catValue)?.label || catValue;
              const percent = Math.round((count / maxCategoryCount) * 100);

              return (
                <div key={catValue} className={styles.barItem}>
                  <div className={styles.barMeta}>
                    <span className={styles.barLabel}>{catLabel}</span>
                    <span className={styles.barValue}>{count} tickets</span>
                  </div>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly Trend Graph */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Monthly Volume Trends</h3>
            <p className={styles.chartSub}>Ticket resolution and inquiry volume over 6 months</p>
          </div>

          <div className={styles.trendChart}>
            {monthlyTrends.map((t) => {
              const heightPercent = Math.round((t.count / maxTrendCount) * 100);

              return (
                <div key={t.month} className={styles.trendBarWrapper}>
                  <span className={styles.trendValue}>{t.count}</span>
                  <div className={styles.trendBarTrack}>
                    <div
                      className={styles.trendBarFill}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className={styles.trendMonth}>{t.month}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Recurring Student Pain Points List */}
      <div className={styles.problemsCard}>
        <div className={styles.problemsHeader}>
          <h3 className={styles.chartTitle}>Top Recurring Student Pain Points</h3>
          <p className={styles.chartSub}>Most frequent issues identified by student support logs</p>
        </div>

        <div className={styles.problemsList}>
          {topProblems.map((prob, idx) => (
            <div key={idx} className={styles.problemRow}>
              <span className={styles.problemRank}>#{idx + 1}</span>
              <span className={styles.problemText}>{prob.problem}</span>
              <span className={styles.problemBadge}>{prob.count} reports</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
