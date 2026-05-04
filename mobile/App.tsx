import React, { useState } from 'react';
import "./global.css";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Image, Dimensions, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  Building2,
  UserCheck,
  FileCheck,
  Plane,
  ArrowRight,
  Menu,
  Plus,
  Minus,
  Mail,
  Phone,
  MapPin,
  ChevronRight
} from 'lucide-react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const { width } = Dimensions.get('window');

const services = [
  { title: "Company Formation", description: "LLC, 100% Ownership & Free Zone", icon: Building2, color: "#3B82F6" },
  { title: "PRO Services", description: "Govt. relations & document clearing", icon: UserCheck, color: "#A855F7" },
  { title: "Attestation", description: "Global document legalization", icon: FileCheck, color: "#F59E0B" },
  { title: "Visa Processing", description: "Work, Family & Investor visas", icon: Plane, color: "#10B981" },
];

const faqs = [
  {
    question: "What are the requirements to start an LLC?",
    answer: "You typically need two shareholders. 100% foreign ownership is available in many sectors."
  },
  {
    question: "How long does it take?",
    answer: "On average, 2 to 4 weeks depending on the business type and documentation."
  }
];

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      {/* Header */}
      <StyledView className="px-6 py-4 flex-row items-center justify-between border-b border-gray-100">
        <StyledView className="flex-row items-center gap-1">
          <Image
            source={require('./assets/logo.png')}
            style={{ width: 80, height: 80 }}
            resizeMode="contain"
          />
          <StyledText className="text-3xl font-black tracking-tighter text-primary">
            TREK<StyledText className="text-secondary">GROUP</StyledText>
          </StyledText>
        </StyledView>
        <StyledTouchableOpacity>
          <Menu size={24} color="#2D1B69" />
        </StyledTouchableOpacity>
      </StyledView>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <StyledView className="px-6 py-12 items-center text-center">
          <StyledView className="bg-secondary/10 px-4 py-1.5 rounded-full mb-6 border border-secondary/20">
            <StyledText className="text-secondary font-bold text-xs uppercase tracking-widest">
              Business Solutions in Qatar
            </StyledText>
          </StyledView>

          <StyledText className="text-4xl font-black text-primary text-center leading-tight mb-4">
            Build Your <StyledText className="text-secondary italic">Future</StyledText> in Qatar
          </StyledText>

          <StyledText className="text-gray-500 text-center leading-relaxed mb-8">
            Qatar's most trusted partner for company formation and PRO services.
          </StyledText>

          <StyledTouchableOpacity className="bg-secondary w-full py-4 rounded-2xl items-center justify-center flex-row gap-2 shadow-xl shadow-secondary/30">
            <StyledText className="text-white font-bold text-lg">Get Started</StyledText>
            <ArrowRight size={20} color="white" />
          </StyledTouchableOpacity>
        </StyledView>

        {/* Services Grid */}
        <StyledView className="px-6 py-10 bg-gray-50">
          <StyledText className="text-xs font-bold text-secondary uppercase tracking-widest mb-2 text-center">Expertise</StyledText>
          <StyledText className="text-2xl font-black text-primary mb-8 text-center">Our Core Services</StyledText>
          <StyledView className="flex-row flex-wrap justify-between gap-y-4">
            {services.map((service, index) => (
              <StyledView
                key={index}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
                style={{ width: (width - 60) / 2 }}
              >
                <StyledView
                  className="w-12 h-12 rounded-2xl items-center justify-center mb-4"
                  style={{ backgroundColor: service.color + '20' }}
                >
                  <service.icon size={24} color={service.color} />
                </StyledView>
                <StyledText className="text-lg font-bold text-primary mb-2">{service.title}</StyledText>
                <StyledText className="text-gray-400 text-xs leading-relaxed mb-4">{service.description}</StyledText>
                <StyledTouchableOpacity className="flex-row items-center">
                  <StyledText className="text-secondary font-bold text-[10px] uppercase">Learn More</StyledText>
                  <ChevronRight size={12} color="#D4AF37" />
                </StyledTouchableOpacity>
              </StyledView>
            ))}
          </StyledView>
        </StyledView>

        {/* About Section */}
        <StyledView className="px-6 py-16">
          <StyledView className="aspect-square bg-gray-200 rounded-[3rem] overflow-hidden mb-8 relative">
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80' }}
              className="w-full h-full"
            />
            <StyledView className="absolute bottom-4 right-4 bg-secondary p-4 rounded-2xl">
              <StyledText className="text-white font-black text-2xl">10+</StyledText>
              <StyledText className="text-white/80 text-[8px] font-bold uppercase">Years</StyledText>
            </StyledView>
          </StyledView>
          <StyledText className="text-secondary font-bold uppercase text-xs tracking-widest mb-2">About Us</StyledText>
          <StyledText className="text-3xl font-black text-primary mb-4 leading-tight">
            Your Strategic Partner for Growth
          </StyledText>
          <StyledText className="text-gray-500 leading-relaxed mb-6">
            We simplify the complexities of starting and running a business in Qatar with over 10 years of expertise and hundreds of satisfied clients.
          </StyledText>

          <StyledView className="space-y-4">
            {["Expert Local Knowledge", "Fast Processing", "Transparent Pricing"].map((item) => (
              <StyledView key={item} className="flex-row items-center gap-3">
                <StyledView className="w-5 h-5 rounded-full bg-secondary/20 items-center justify-center">
                  <StyledText className="text-secondary font-bold text-[10px]">✓</StyledText>
                </StyledView>
                <StyledText className="font-bold text-primary">{item}</StyledText>
              </StyledView>
            ))}
          </StyledView>
        </StyledView>

        {/* FAQ Section */}
        <StyledView className="px-6 py-10 bg-gray-50">
          <StyledText className="text-2xl font-black text-primary mb-6">FAQ</StyledText>
          {faqs.map((faq, index) => (
            <StyledView key={index} className="mb-4 bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <StyledTouchableOpacity
                onPress={() => setOpenFaq(openFaq === index ? null : index)}
                className="p-5 flex-row items-center justify-between"
              >
                <StyledText className="font-bold text-primary flex-1 pr-4">{faq.question}</StyledText>
                <StyledView className="w-6 h-6 rounded-full bg-secondary/10 items-center justify-center">
                  {openFaq === index ? <Minus size={14} color="#D4AF37" /> : <Plus size={14} color="#D4AF37" />}
                </StyledView>
              </StyledTouchableOpacity>
              {openFaq === index && (
                <StyledView className="p-5 pt-0">
                  <StyledText className="text-gray-500 text-sm leading-relaxed">{faq.answer}</StyledText>
                </StyledView>
              )}
            </StyledView>
          ))}
        </StyledView>

        {/* CTA */}
        <StyledView className="px-6 py-16 bg-primary">
          <StyledText className="text-3xl font-black text-white text-center mb-4">Ready to Start?</StyledText>
          <StyledText className="text-white/60 text-center mb-8">Contact us today for a free consultation.</StyledText>
          <StyledTouchableOpacity className="bg-secondary p-5 rounded-full items-center shadow-lg shadow-secondary/40">
            <StyledText className="text-white font-black text-lg">Contact Us Now</StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        {/* Contact Info */}
        <StyledView className="px-6 py-12 bg-primary border-t border-white/5">
          <StyledView className="space-y-6">
            <StyledView className="flex-row items-center gap-4">
              <MapPin size={20} color="#D4AF37" />
              <StyledText className="text-white/60 text-sm">Al Reem Tower, Doha, Qatar</StyledText>
            </StyledView>
            <StyledView className="flex-row items-center gap-4">
              <Phone size={20} color="#D4AF37" />
              <StyledText className="text-white/60 text-sm">+974 4455 6677</StyledText>
            </StyledView>
            <StyledView className="flex-row items-center gap-4">
              <Mail size={20} color="#D4AF37" />
              <StyledText className="text-white/60 text-sm">info@trek-group.com</StyledText>
            </StyledView>
          </StyledView>
          <StyledText className="text-white/20 text-center mt-12 text-[10px]">© 2026 Trek Group Qatar. All rights reserved.</StyledText>
        </StyledView>
      </ScrollView>
    </SafeAreaView>
  );
}
