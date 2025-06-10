import Email from "../models/Email.js";
import User from "../models/User.js";

// api/v1/email/create
export const createEmail = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) return res.json({ success: false, message: 'Not Authorized.' });
    const { to, subject, message } = req.body;
    if (!to || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    const email = await Email.create({
      to,
      subject,
      message,
      userId
    });

    return res.status(200).json({ success: true, message: 'Email Sent Successfully.', email });

  } catch (error) {
    console.log('createError: ', error);
  }
}

// api/v1/email/:id
export const deleteEmail = async (req, res) => {
  try {
    const emailId = req.params.id;
    if (!emailId) return res.status(400).json({ success: false, message: 'EmailId is required.' });

    const email = await Email.findByIdAndDelete(emailId);
    if (!email) return res.status(400).json({ success: false, message: 'Email is not found.' });

    return res.status(200).json({ success: true, message: 'Email deleted successfully.' });
  } catch (error) {
    console.log('createError: ', error);
  }
}

// api/v1/email/getAllEmails
export const getAllEmailById = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) return res.status(400).json({ success: false, message: 'User does not exist.' });
    const emails = await Email.find({ userId });
    return res.status(200).json({ success: true, emails });
  } catch (error) {
    console.log('getAllEmailById error: ', error);
  }
}

// api/v1/email/getAllInboxEmails
export const getAllInboxEmail = async (req, res) => {
  try {
    const { email } = req.body;    
    if (!email) return res.status(400).json({ success: false, message: 'Not Authorized' });
    const inboxEmails = await Email.find({ to: email }).lean();
    const senders = [];
    for (const inbox of inboxEmails) {
      let senderData = await User.findOne({ _id: inbox.userId });
      senders.push(senderData.email);
    }
    let i = 0;
    const updatedInboxEmails = inboxEmails.map((email) => ({
      ...email,
      sender: senders[i++]
    }));
    return res.status(200).json({ success: true, inboxEmails: updatedInboxEmails });
  } catch (error) {
    console.log(error);
  }
}