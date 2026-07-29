/* ============================================
   ManageCounselling Page (Rep/Admin)
   DIU Student Welfare System
   ============================================ */

import { useState, useMemo } from 'react';
import {
  UserGroupIcon,
  CalendarIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChevronDownIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import { useCounselling } from '../../hooks/useCounselling';
import { COUNSELLING_TYPES, COUNSELLING_STATUS_CONFIG } from '../../utils/constants';
import { formatDate } from '../../utils/helpers';
import styles from './ManageCounselling.module.css';

export default function ManageCounselling() {
  const { user } = useAuth();
  const { requests, updateRequestStatus } = useCounselling();

  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter requests
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const matchesStatus = selectedStatus === 'all' || req.status === selectedStatus;
      const matchesType = selectedType === 'all' || req.type === selectedType;

      const q = searchQuery.toLowerCase().trim();
      const matchesQ =
        !q ||
        req.studentName.toLowerCase().includes(q) ||
        req.description.toLowerCase().includes(q);

      return matchesStatus && matchesType && matchesQ;
    });
  }, [requests, selectedStatus, selectedType, searchQuery]);

  const pendingCount = requests.filter((r) => r.status === 'pending').length;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Manage Counselling Sessions</h1>
          <p className={styles.subtitle}>
            Review student counselling requests for admission, academic support, research thesis, and career development.
          </p>
        </div>

        {pendingCount > 0 && (
          <div className={styles.statBadge}>
            <ClockIcon style={{ width: 16, height: 16 }} /> Pending Requests: <strong>{pendingCount}</strong>
          </div>
        )}
      </div>

      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <div className={styles.statusTabs}>
          <button
            type="button"
            className={`${styles.tab} ${selectedStatus === 'all' ? styles.activeTab : ''}`}
            onClick={() => setSelectedStatus('all')}
          >
            All ({requests.length})
          </button>
          <button
            type="button"
            className={`${styles.tab} ${selectedStatus === 'pending' ? styles.activeTab : ''}`}
            onClick={() => setSelectedStatus('pending')}
          >
            Pending ({requests.filter((r) => r.status === 'pending').length})
          </button>
          <button
            type="button"
            className={`${styles.tab} ${selectedStatus === 'accepted' ? styles.activeTab : ''}`}
            onClick={() => setSelectedStatus('accepted')}
          >
            Accepted
          </button>
          <button
            type="button"
            className={`${styles.tab} ${selectedStatus === 'scheduled' ? styles.activeTab : ''}`}
            onClick={() => setSelectedStatus('scheduled')}
          >
            Scheduled
          </button>
          <button
            type="button"
            className={`${styles.tab} ${selectedStatus === 'completed' ? styles.activeTab : ''}`}
            onClick={() => setSelectedStatus('completed')}
          >
            Completed
          </button>
        </div>

        <div className={styles.rightFilters}>
          <div className={styles.selectWrapper}>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className={styles.typeSelect}
            >
              <option value="all">All Counselling Types</option>
              {COUNSELLING_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            <ChevronDownIcon style={{ width: 14, height: 14 }} className={styles.selectChevron} />
          </div>

          <div className={styles.searchBox}>
            <MagnifyingGlassIcon style={{ width: 16, height: 16 }} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search student name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
      </div>

      {/* Request Cards Grid */}
      <div className={styles.requestsGrid}>
        {filteredRequests.length > 0 ? (
          filteredRequests.map((req) => {
            const statusConfig = COUNSELLING_STATUS_CONFIG[req.status];
            const typeLabel = COUNSELLING_TYPES.find((t) => t.value === req.type)?.label || req.type;

            return (
              <div key={req.id} className={styles.requestCard}>
                <div className={styles.cardTop}>
                  <span className={styles.typeChip}>{typeLabel}</span>
                  <span
                    className={styles.statusBadge}
                    style={{
                      backgroundColor: `color-mix(in srgb, var(${statusConfig.colorVar}) 12%, transparent)`,
                      color: `var(${statusConfig.colorVar})`,
                    }}
                  >
                    {statusConfig.label}
                  </span>
                </div>

                <div className={styles.studentMeta}>
                  <UserIcon style={{ width: 20, height: 20 }} className={styles.userIcon} />
                  <div>
                    <strong className={styles.studentName}>{req.studentName}</strong>
                    <span className={styles.reqDate}>Requested {formatDate(req.createdAt)}</span>
                  </div>
                </div>

                <p className={styles.description}>{req.description}</p>

                {(req.preferredDate || req.assignedTo) && (
                  <div className={styles.scheduleInfo}>
                    {req.preferredDate && (
                      <span><CalendarIcon style={{ width: 12, height: 12 }} /> {req.preferredDate}</span>
                    )}
                    {req.preferredTime && (
                      <span><ClockIcon style={{ width: 12, height: 12 }} /> {req.preferredTime}</span>
                    )}
                    {req.assignedTo && (
                      <span className={styles.assignedName}>Staff: {req.assignedTo}</span>
                    )}
                  </div>
                )}

                {/* Management Action Buttons */}
                <div className={styles.cardFooter}>
                  <div className={styles.actionBtns}>
                    {req.status === 'pending' && (
                      <>
                        <button
                          type="button"
                          className={`${styles.actionBtn} ${styles.acceptBtn}`}
                          onClick={() => updateRequestStatus(req.id, 'accepted', user ?? undefined)}
                        >
                          <CheckCircleIcon style={{ width: 14, height: 14 }} /> Accept
                        </button>
                        <button
                          type="button"
                          className={`${styles.actionBtn} ${styles.declineBtn}`}
                          onClick={() => updateRequestStatus(req.id, 'declined', user ?? undefined)}
                        >
                          <XCircleIcon style={{ width: 14, height: 14 }} /> Decline
                        </button>
                      </>
                    )}

                    {req.status === 'accepted' && (
                      <button
                        type="button"
                        className={`${styles.actionBtn} ${styles.scheduleBtn}`}
                        onClick={() => updateRequestStatus(req.id, 'scheduled', user ?? undefined)}
                      >
                        <CalendarIcon style={{ width: 14, height: 14 }} /> Mark Scheduled
                      </button>
                    )}

                    {req.status === 'scheduled' && (
                      <button
                        type="button"
                        className={`${styles.actionBtn} ${styles.completeBtn}`}
                        onClick={() => updateRequestStatus(req.id, 'completed', user ?? undefined)}
                      >
                        <CheckCircleIcon style={{ width: 14, height: 14 }} /> Mark Completed
                      </button>
                    )}

                    {req.status === 'completed' && (
                      <span className={styles.completedTag}>✓ Completed Session</span>
                    )}

                    {req.status === 'declined' && (
                      <span className={styles.declinedTag}>Declined Request</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.emptyState}>
            <UserGroupIcon style={{ width: 48, height: 48 }} className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No counselling requests found</h3>
            <p className={styles.emptyText}>
              No student requests match your current filters or search query.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
