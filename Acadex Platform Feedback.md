# **Acadex Platform Feedback (Version 1\)**

## **1\. Homepage**

### **Platform Name**

* Change platform name from the current name to **Acadex**.  
* Preferred domain:  
  * **acadex.com** (check availability and reserve if possible).

  ### **Alternative Names (if Acadex is unavailable)**

* UniDesk  
* CampusHub  
* StudentBridge  
* UniConnect  
* CampusOne  
* StudentSphere  
* UniSupport  
* CampusPortal  
* EduLink  
* CampusCore  
  ---

  ### **Navigation Bar**

The homepage should have a modern navigation bar containing:

* Home  
* About  
* Partners  
* Search Bar  
* Three-dot (⋮) or Hamburger Menu (☰)

The menu should contain:

* Home  
* Login  
* Create Account

Users should be able to return to the homepage from anywhere using this menu.

---

### **Hero Section**

Replace the existing description with:

> **Official university platform for the students of Daffodil International University, providing seamless access to student support services including online student help desk, admission support, academic guidelines, departmental notices, off/on campus job board, and dedicated counselling services.**

---

# **2\. Login Interface**

### **Remove Admin Selection**

Do **not** provide any Admin login option on the UI.

Admin authentication should only be accessible through a separate secured API endpoint.

---

### **User Type Selection**

There should be only two primary options.

### **Student (Default Selected)**

Tooltip:

> Current student of DIU. Click here.

---

### **Guest**

Tooltip:

> Not a current student of DIU. Click here.

---

### **Visual Feedback**

When a user selects either option:

* Selected card/button should change color.  
* Login UI theme may also change based on the selected role.  
* It should be immediately obvious which option is currently selected.

Student should remain selected by default when a visitor first opens the login page.

---

### **Guest Flow**

If Guest is selected, show another dropdown.

Options:

* Alumni  
* Non-DIU Guest  
  ---

  ## **Alumni**

Show normal login page with:

* University Email / Student ID  
* Password

Include:

* Google Login  
  ---

    
    
    
  


  ## **Non-DIU Guest**

Do **not** show login.

Instead redirect them to a limited-access experience.

Allowed Features:

* Admission Counselling  
* Admission Support / Help Desk

Restricted Features:

* Student Help Desk  
* Department Notices  
* Job Board  
* Student Services  
* Counselling Dashboard  
* Internal Academic Services

The system should clearly notify users that additional services are only available to DIU students and alumni.

---

### **Google Authentication**

Provide Google Sign-In for:

* Student  
* Alumni

Do **not** provide Google login for Non-DIU Guests.

Student registration through Google should only accept verified **DIU Google accounts**.

---

### **Navigation**

Users should always be able to return to the homepage using:

Home → Three-dot Menu

---

# **3\. Registration Interface**

Remove Guest registration completely.

Registration should only support:

* Student  
* Alumni  
  ---

  ### **Required Fields**

Make **Student ID** mandatory for both:

* Student  
* Alumni  
  ---

  ### **Password Confirmation**

Disable copy-paste into the **Confirm Password** field.

Users must manually re-enter the password.

---

### **Google Registration**

Allow Google Registration.

Only verified DIU Google accounts should be accepted.

---

### **Navigation**

Allow users to return to the homepage through the Home option in the three-dot/hamburger menu.

---

# **4\. Dashboard**

## **Edit Profile**

Add a complete Edit Profile page.

Users should be able to update:

* Profile Picture  
* Full Name  
* Contact Number  
* Alternate Email  
* Department  
* Batch  
* Semester  
* Blood Group (optional)  
* Address (optional)  
* Personal Bio (optional)  
  ---

  ## **Dashboard Switching Bug**

Current issue:

When switching

Student View  
→ SW Representative View  
→ Student View

the system redirects the user to the demo account instead of returning to the logged-in user's account.

Expected behavior:

The system should preserve the authenticated user's session and return them to **their own dashboard**, not the demo account.

---

# **5\. Overall UX Improvements**

* Student should be the default login mode.  
* Smooth color transitions when changing user type.  
* Consistent navigation across Home, Login, Register, and Dashboard.  
* Responsive design for desktop, tablet, and mobile.  
* Clear role-based access control with no unauthorized features exposed.  
* Maintain a modern, clean, and professional university branding throughout the platform.

**Will update rest feedbacks here**