import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useToast } from '../hooks/use-toast';
import { personalInfo } from '../data/mock';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Netlify Forms submission
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...formData
        }).toString()
      });

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try emailing me directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light tracking-tight text-black mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-black mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-light text-black mb-6">Contact Information</h3>
              <div className="space-y-4">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center space-x-4 text-gray-600 hover:text-black transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                    <Mail size={20} />
                  </div>
                  <span className="text-base">{personalInfo.email}</span>
                </a>

                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center space-x-4 text-gray-600 hover:text-black transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                    <Phone size={20} />
                  </div>
                  <span className="text-base">{personalInfo.phone}</span>
                </a>

                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  <span className="text-base">{personalInfo.location}</span>
                </div>
              </div>
            </div>

            <Card className="border-gray-200 bg-white">
              <CardContent className="p-6">
                <h4 className="text-lg font-medium text-black mb-4">Let's Connect</h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    className="border-black text-black hover:bg-black hover:text-white transition-colors"
                    onClick={() => window.open(personalInfo.github, '_blank')}
                  >
                    GitHub
                  </Button>
                  <Button
                    variant="outline"
                    className="border-black text-black hover:bg-black hover:text-white transition-colors"
                    onClick={() => window.open(personalInfo.linkedin, '_blank')}
                  >
                    LinkedIn
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-gray-200 bg-white">
            <CardContent className="p-8">
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Netlify form detection */}
                <input type="hidden" name="form-name" value="contact" />
                {/* Honeypot field for spam protection */}
                <div style={{ display: 'none' }}>
                  <label>
                    Don't fill this out if you're human: <input name="bot-field" />
                  </label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm text-gray-700">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="border-gray-300 focus:border-black focus:ring-black"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="border-gray-300 focus:border-black focus:ring-black"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm text-gray-700">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                    className="border-gray-300 focus:border-black focus:ring-black"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm text-gray-700">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or inquiry..."
                    rows={5}
                    required
                    className="border-gray-300 focus:border-black focus:ring-black resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
