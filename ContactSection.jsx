import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { AlertCircle, CheckCircle2, ArrowUp } from "lucide-react";
import { FaBehance, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { apiRequest } from "../lib/queryClient";

// Define form schema with validation
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(null);
  const currentYear = new Date().getFullYear();

  // Initialize form with react-hook-form
  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setFormSuccess(false);
    setFormError(null);

    try {
      await apiRequest("POST", "/api/contact", data);
      setFormSuccess(true);
      form.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setFormSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setFormError("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <section id="contact" className="bg-[#f5f5f5] py-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left column */}
          <div>
            <h2 className="text-4xl font-bold mb-8 text-navy">Get in touch</h2>
            
            <p className="text-lg mb-10">
              I'm always interested in new projects and collaborations. Feel free to reach out if you'd like to work together or just say hello.
            </p>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-2">Email</h3>
              <a 
                href="mailto:contact@marinaweishaupt.com" 
                className="text-blue-600 hover:underline"
              >
                contact@marinaweishaupt.com
              </a>
            </div>
            
            <div className="mb-12">
              <h3 className="text-lg font-medium mb-2">Social</h3>
              <div className="flex space-x-4">
                <a href="https://behance.net" target="_blank" rel="noopener noreferrer" 
                   className="bg-[#f0f0f0] p-3 rounded-full hover:bg-gray-200 transition-colors duration-300">
                  <FaBehance className="text-navy" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                   className="bg-[#f0f0f0] p-3 rounded-full hover:bg-gray-200 transition-colors duration-300">
                  <FaInstagram className="text-navy" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                   className="bg-[#f0f0f0] p-3 rounded-full hover:bg-gray-200 transition-colors duration-300">
                  <FaLinkedinIn className="text-navy" />
                </a>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mt-auto">&copy; {currentYear} Marina Weishaupt. All rights reserved.</p>
          </div>
          
          {/* Right column - Form */}
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-navy font-medium">Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your Name" 
                          {...field} 
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-navy"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-navy font-medium">Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your.email@example.com" 
                          type="email" 
                          {...field} 
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-navy"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-navy font-medium">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your message here..." 
                          rows={5} 
                          {...field} 
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-navy"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="py-3 px-6 bg-navy text-white rounded-md hover:bg-navy/90 transition-colors duration-300 w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                
                {formSuccess && (
                  <Alert className="bg-green-100 text-green-700 p-4 rounded-md border-green-200">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    <AlertDescription>
                      Thank you! Your message has been sent successfully.
                    </AlertDescription>
                  </Alert>
                )}
                
                {formError && (
                  <Alert className="bg-red-100 text-red-700 p-4 rounded-md border-red-200">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <AlertDescription>
                      {formError}
                    </AlertDescription>
                  </Alert>
                )}
              </form>
            </Form>
          </div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className="absolute bottom-8 right-8 bg-navy text-white p-3 rounded-full shadow-lg hover:bg-navy/80 transition-colors duration-300"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </section>
  );
}