import NewsletterSubscriber from '../models/NewsletterSubscriber.js';
import sendMail from '../utils/mailer.js';

export const subscribe = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const [subscriber, created] = await NewsletterSubscriber.findOrCreate({
      where: { email },
      defaults: { name },
    });

    if (!created) {
      subscriber.isActive = true;
      subscriber.name = name || subscriber.name;
      await subscriber.save();
    }

    res.status(201).json({ message: 'Successfully subscribed to the newsletter.' });
  } catch (error) {
    next(error);
  }
};

export const listSubscribers = async (_req, res, next) => {
  try {
    const subscribers = await NewsletterSubscriber.findAll();
    res.json(subscribers);
  } catch (error) {
    next(error);
  }
};

export const sendNewsletter = async (req, res, next) => {
  try {
    const { subject, content } = req.body;
    const subscribers = await NewsletterSubscriber.findAll({ where: { isActive: true } });

    await Promise.all(
      subscribers.map((subscriber) =>
        sendMail({
          to: subscriber.email,
          subject,
          html: content,
          text: content,
        })
      )
    );

    res.json({ message: 'Newsletter sent successfully' });
  } catch (error) {
    next(error);
  }
};

export const toggleSubscriber = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subscriber = await NewsletterSubscriber.findByPk(id);
    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }

    subscriber.isActive = !subscriber.isActive;
    await subscriber.save();
    res.json(subscriber);
  } catch (error) {
    next(error);
  }
};
