-- ============================================
-- Acadex Platform Database Schema (MySQL / XAMPP)
-- Database Name: acadex_db
-- ============================================

CREATE DATABASE IF NOT EXISTS `acadex_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `acadex_db`;

-- --------------------------------------------
-- 1. Table: users
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `full_name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `student_id` VARCHAR(30) DEFAULT NULL UNIQUE,
  `role` ENUM('student', 'alumni', 'representative', 'admin') NOT NULL DEFAULT 'student',
  `department` VARCHAR(80) DEFAULT 'SWE',
  `batch` VARCHAR(30) DEFAULT NULL,
  `semester` VARCHAR(30) DEFAULT NULL,
  `contact_number` VARCHAR(30) DEFAULT NULL,
  `alternate_email` VARCHAR(150) DEFAULT NULL,
  `blood_group` VARCHAR(10) DEFAULT NULL,
  `address` TEXT DEFAULT NULL,
  `bio` TEXT DEFAULT NULL,
  `avatar_url` VARCHAR(255) DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------
-- 2. Table: help_tickets
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS `help_tickets` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `ticket_code` VARCHAR(20) NOT NULL UNIQUE,
  `access_pin` VARCHAR(10) NOT NULL DEFAULT '1234',
  `user_id` VARCHAR(64) DEFAULT NULL,
  `guest_name` VARCHAR(120) DEFAULT NULL,
  `guest_email` VARCHAR(150) DEFAULT NULL,
  `category` ENUM('admission', 'academic', 'financial', 'general') NOT NULL DEFAULT 'general',
  `subject` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `status` ENUM('open', 'in_progress', 'resolved', 'closed') NOT NULL DEFAULT 'open',
  `priority` ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'medium',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_tickets_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------
-- 3. Table: counselling_requests
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS `counselling_requests` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `user_id` VARCHAR(64) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `preferred_slot` VARCHAR(100) DEFAULT NULL,
  `status` ENUM('pending', 'scheduled', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_counselling_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------
-- 4. Table: announcements
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS `announcements` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `category` VARCHAR(50) NOT NULL DEFAULT 'General',
  `author_id` VARCHAR(64) DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_announcements_author` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------
-- 5. Seed Initial Data
-- --------------------------------------------
INSERT INTO `users` (`id`, `full_name`, `email`, `student_id`, `role`, `department`, `batch`, `semester`, `contact_number`, `created_at`)
VALUES 
  ('usr-student-001', 'Zishan Ahmed', 'zishan15-7100@diu.edu.bd', '222-15-7100', 'student', 'SWE', '60th', '8th', '+8801700000000', NOW()),
  ('usr-rep-001', 'Fariha Rahman', 'fariha15-7050@diu.edu.bd', '222-15-7050', 'representative', 'SWE', '60th', '8th', '+8801800000000', NOW()),
  ('usr-admin-001', 'Dr. Touhid Bhuiyan', 'touhid.swe@diu.edu.bd', NULL, 'admin', 'SWE', 'Faculty', 'N/A', '+8801900000000', NOW())
ON DUPLICATE KEY UPDATE `email`=`email`;
