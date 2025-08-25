# DSA Tracker 🚀

DSA Tracker is a **Node.js automation tool** to help you stay consistent with your daily LeetCode practice.  
It checks your daily submissions and automatically sends an **email reminder** if you haven’t solved enough problems (less than 5 submissions in a day).

---

## Features

- Tracks your **daily LeetCode submissions** using GraphQL API.
- Sends **automated email alerts** if you solve fewer than 5 problems.
- Fully configurable **email credentials** via `.env`.
- Runs as a **cron job**, so you get reminded every day at a fixed time.
- Simple and lightweight **ES Module-based Node.js script**.

---

## Installation

1. Clone the repo:

```bash
git clone https://github.com/yourusername/dsa-tracker.git
cd dsa-tracker

2.Install dependencies:
npm install

3. Create a .env file:
EMAIL=yourgmail@gmail.com
EMAIL_PASS=your-app-password

4.Set your LeetCode username in index.js:
const LEETCODE_USERNAME = "your-leetcode-username";

5.Usage
node index.js


