/* ============================================
   EditProfile Component — Acadex Platform
   Allows users to update profile details, bio, avatar, and contact info.
   Locks academic fields (Student ID, Department, Batch) for security.
   ============================================ */

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  AcademicCapIcon,
  IdentificationIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  HeartIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowLeftIcon,
  CameraIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import styles from './EditProfile.module.css';

export default function EditProfile() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  /* ── Form State ── */
  const [contactNumber, setContactNumber] = useState(user?.contactNumber || '');
  const [alternateEmail, setAlternateEmail] = useState(user?.alternateEmail || '');
  const [semester, setSemester] = useState(user?.semester || '8th');
  const [bloodGroup, setBloodGroup] = useState(user?.bloodGroup || '');
  const [address, setAddress] = useState(user?.address || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  /* Handle Profile Avatar File Upload */
  function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Avatar image file size must be less than 2MB.' });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  /* Handle Form Save */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage(null);
    setIsSaving(true);

    const res = await updateProfile({
      contactNumber,
      alternateEmail,
      semester,
      bloodGroup,
      address,
      bio,
      avatarUrl,
    });

    setIsSaving(false);

    if (res.success) {
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => navigate('/dashboard'), 1500);
    } else {
      setMessage({ type: 'error', text: res.error || 'Failed to update profile.' });
    }
  }

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => navigate('/dashboard')}>
        <ArrowLeftIcon style={{ width: 16, height: 16 }} /> Back to Dashboard
      </button>

      <div className={styles.profileHeader}>
        <h1>Edit User Profile</h1>
        <p>Update your personal information, contact preferences, and public bio.</p>
      </div>

      {message && (
        <div className={`${styles.alert} ${message.type === 'success' ? styles.alertSuccess : styles.alertError}`}>
          {message.type === 'success' ? (
            <CheckCircleIcon style={{ width: 20, height: 20 }} />
          ) : (
            <ExclamationCircleIcon style={{ width: 20, height: 20 }} />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.formGrid}>
        {/* Avatar Section */}
        <div className={styles.avatarSection}>
          <div className={styles.avatarWrapper}>
            {avatarUrl ? (
              <img src={avatarUrl} alt="User Avatar" className={styles.avatarImg} />
            ) : (
              <div className={styles.avatarFallback}>
                {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
            <label className={styles.cameraOverlay} title="Upload Profile Picture">
              <CameraIcon style={{ width: 20, height: 20 }} />
              <input type="file" accept="image/*" onChange={handleAvatarChange} className={styles.fileInput} />
            </label>
          </div>
          <p className={styles.avatarHint}>Click the camera icon to upload a profile photo (Max 2MB)</p>
        </div>

        {/* Locked Academic Fields */}
        <div className={styles.cardSection}>
          <h2 className={styles.sectionTitle}>
            <AcademicCapIcon style={{ width: 20, height: 20 }} /> Academic Credentials (Read-Only)
          </h2>
          <div className={styles.readOnlyGrid}>
            <div className={styles.fieldGroup}>
              <label><UserIcon style={{ width: 14, height: 14 }} /> Full Name</label>
              <div className={styles.lockedValue}>{user?.fullName} <LockClosedIcon style={{ width: 14, height: 14 }} /></div>
            </div>

            <div className={styles.fieldGroup}>
              <label><IdentificationIcon style={{ width: 14, height: 14 }} /> Student ID</label>
              <div className={styles.lockedValue}>{user?.studentId || 'N/A'} <LockClosedIcon style={{ width: 14, height: 14 }} /></div>
            </div>

            <div className={styles.fieldGroup}>
              <label><BuildingOfficeIcon style={{ width: 14, height: 14 }} /> Department</label>
              <div className={styles.lockedValue}>{user?.department || 'SWE'} <LockClosedIcon style={{ width: 14, height: 14 }} /></div>
            </div>

            <div className={styles.fieldGroup}>
              <label><EnvelopeIcon style={{ width: 14, height: 14 }} /> Official Email</label>
              <div className={styles.lockedValue}>{user?.email} <LockClosedIcon style={{ width: 14, height: 14 }} /></div>
            </div>
          </div>
        </div>

        {/* Editable Personal & Contact Fields */}
        <div className={styles.cardSection}>
          <h2 className={styles.sectionTitle}>
            <PhoneIcon style={{ width: 20, height: 20 }} /> Personal & Contact Details
          </h2>

          <div className={styles.formRow}>
            <div className={styles.fieldGroup}>
              <label htmlFor="contactNumber"><PhoneIcon style={{ width: 14, height: 14 }} /> Contact Number</label>
              <input
                id="contactNumber"
                type="tel"
                placeholder="+8801700000000"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="altEmail"><EnvelopeIcon style={{ width: 14, height: 14 }} /> Alternate Email</label>
              <input
                id="altEmail"
                type="email"
                placeholder="personal@gmail.com"
                value={alternateEmail}
                onChange={(e) => setAlternateEmail(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.fieldGroup}>
              <label htmlFor="semester">Current Semester</label>
              <select
                id="semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className={styles.select}
              >
                <option value="1st">1st Semester</option>
                <option value="2nd">2nd Semester</option>
                <option value="3rd">3rd Semester</option>
                <option value="4th">4th Semester</option>
                <option value="5th">5th Semester</option>
                <option value="6th">6th Semester</option>
                <option value="7th">7th Semester</option>
                <option value="8th">8th Semester</option>
                <option value="Alumni">Alumni</option>
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="bloodGroup"><HeartIcon style={{ width: 14, height: 14 }} /> Blood Group (Optional)</label>
              <select
                id="bloodGroup"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className={styles.select}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="address"><MapPinIcon style={{ width: 14, height: 14 }} /> Present Address (Optional)</label>
            <input
              id="address"
              type="text"
              placeholder="Daffodil Smart City, Ashulia, Dhaka"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="bio"><DocumentTextIcon style={{ width: 14, height: 14 }} /> Personal Bio (Optional)</label>
            <textarea
              id="bio"
              rows={3}
              placeholder="Write a brief intro about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className={styles.textarea}
            />
          </div>
        </div>

        <div className={styles.actionRow}>
          <button type="button" className={styles.cancelBtn} onClick={() => navigate('/dashboard')}>
            Cancel
          </button>
          <button type="submit" disabled={isSaving} className={styles.saveBtn}>
            {isSaving ? 'Saving Changes...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
