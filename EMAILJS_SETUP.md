# EmailJS Setup Guide for Contact Form

Follow these steps to enable direct email sending from your portfolio contact form to **biswajeetrout2006@gmail.com**.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** (it's free - 200 emails/month)
3. Sign up with your Google account or email

## Step 2: Add Email Service

1. After logging in, go to **"Email Services"** in the left sidebar
2. Click **"Add New Service"**
3. Select **"Gmail"** as your email service
4. Click **"Connect Account"** and sign in with **biswajeetrout2006@gmail.com**
5. Give it a name like "Portfolio Contact"
6. Click **"Create Service"**
7. **Copy the Service ID** (looks like `service_xxxxxxx`) - you'll need this!

## Step 3: Create Email Template

1. Go to **"Email Templates"** in the left sidebar
2. Click **"Create New Template"**
3. Configure the template:

   **Subject:**
   ```
   New Portfolio Contact from {{from_name}}
   ```

   **Content (Body):**
   ```
   You have received a new message from your portfolio website!

   Name: {{from_name}}
   Email: {{from_email}}

   Message:
   {{message}}

   ---
   This email was sent from your portfolio contact form.
   ```

4. In the **"To Email"** field, enter: `{{to_email}}`
5. Click **"Save"**
6. **Copy the Template ID** (looks like `template_xxxxxxx`) - you'll need this!

## Step 4: Get Your Public Key

1. Go to **"Account"** in the left sidebar
2. Click on **"General"** tab
3. Find **"Public Key"** section
4. **Copy your Public Key** (looks like a long string) - you'll need this!

## Step 5: Update Your Code

Open `/Users/biswyaa/Documents/PortfolioWebsite/components/Contact.tsx` and replace these lines:

```typescript
const serviceId = 'YOUR_SERVICE_ID';      // Replace with your Service ID
const templateId = 'YOUR_TEMPLATE_ID';    // Replace with your Template ID
const publicKey = 'YOUR_PUBLIC_KEY';      // Replace with your Public Key
```

With your actual credentials:

```typescript
const serviceId = 'service_xxxxxxx';      // Your actual Service ID
const templateId = 'template_xxxxxxx';    // Your actual Template ID
const publicKey = 'your_actual_public_key'; // Your actual Public Key
```

## Step 6: Test the Form

1. Save the file
2. Go to your website at http://localhost:3000
3. Scroll to the Contact section
4. Fill out the form with test data
5. Click **"Send Message"**
6. You should see "Message sent successfully!" 
7. Check **biswajeetrout2006@gmail.com** for the email!

## Example Configuration

Here's what your code should look like after setup:

```typescript
const serviceId = 'service_abc123';
const templateId = 'template_xyz789';
const publicKey = 'abcdefghijklmnopqrstuvwxyz';
```

## Troubleshooting

**If emails aren't sending:**
- Check that all three IDs are correct
- Make sure you're signed in to EmailJS with the correct Gmail account
- Check EmailJS dashboard for error logs
- Verify your Gmail account is connected in EmailJS
- Check spam folder in your Gmail

**Free tier limits:**
- 200 emails per month
- If you need more, upgrade to a paid plan

## Security Note

The public key is safe to use in client-side code. EmailJS handles the actual email sending securely on their servers.

---

Once you complete these steps, your contact form will send emails directly to your Gmail without any popup! 🚀
