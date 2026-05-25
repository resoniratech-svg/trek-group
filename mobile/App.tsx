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
      <View className="px-6 py-4 flex-row items-center justify-between border-b border-gray-100">
        <View className="flex-row items-center gap-1">
          <Image
            source={require('./assets/logo.png')}
            style={{ width: 80, height: 80 }}
            resizeMode="contain"
          />
          <Text className="text-3xl font-black tracking-tighter text-primary">
            TREK<Text className="text-secondary">GROUP</Text>
          </Text>
        </View>
        <TouchableOpacity>
          <Menu size={24} color="#2D1B69" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View className="px-6 py-12 items-center text-center">
          <View className="bg-secondary/10 px-4 py-1.5 rounded-full mb-6 border border-secondary/20">
            <Text className="text-secondary font-bold text-xs uppercase tracking-widest">
              Business Solutions in Qatar
            </Text>
          </View>

          <Text className="text-4xl font-black text-primary text-center leading-tight mb-4">
            Build Your <Text className="text-secondary italic">Future</Text> in Qatar
          </Text>

          <Text className="text-gray-500 text-center leading-relaxed mb-8">
            Qatar's most trusted partner for company formation and PRO services.
          </Text>

          <TouchableOpacity className="bg-secondary w-full py-4 rounded-2xl items-center justify-center flex-row gap-2 shadow-xl shadow-secondary/30">
            <Text className="text-white font-bold text-lg">Get Started</Text>
            <ArrowRight size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Services Grid */}
        <View className="px-6 py-10 bg-gray-50">
          <Text className="text-xs font-bold text-secondary uppercase tracking-widest mb-2 text-center">Expertise</Text>
          <Text className="text-2xl font-black text-primary mb-8 text-center">Our Core Services</Text>
          <View className="flex-row flex-wrap justify-between gap-y-4">
            {services.map((service, index) => (
              <View
                key={index}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
                style={{ width: (width - 60) / 2 }}
              >
                <View
                  className="w-12 h-12 rounded-2xl items-center justify-center mb-4"
                  style={{ backgroundColor: service.color + '20' }}
                >
                  <service.icon size={24} color={service.color} />
                </View>
                <Text className="text-lg font-bold text-primary mb-2">{service.title}</Text>
                <Text className="text-gray-400 text-xs leading-relaxed mb-4">{service.description}</Text>
                <TouchableOpacity className="flex-row items-center">
                  <Text className="text-secondary font-bold text-[10px] uppercase">Learn More</Text>
                  <ChevronRight size={12} color="#D4AF37" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* About Section */}
        <View className="px-6 py-16">
          <View className="aspect-square bg-gray-200 rounded-[3rem] overflow-hidden mb-8 relative">
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80' }}
              className="w-full h-full"
            />
            <View className="absolute bottom-4 right-4 bg-secondary p-4 rounded-2xl">
              <Text className="text-white font-black text-2xl">10+</Text>
              <Text className="text-white/80 text-[8px] font-bold uppercase">Years</Text>
            </View>
          </View>
          <Text className="text-secondary font-bold uppercase text-xs tracking-widest mb-2">About Us</Text>
          <Text className="text-3xl font-black text-primary mb-4 leading-tight">
            Your Strategic Partner for Growth
          </Text>
          <Text className="text-gray-500 leading-relaxed mb-6">
            We simplify the complexities of starting and running a business in Qatar with over 10 years of expertise and hundreds of satisfied clients.
          </Text>

          <View className="space-y-4">
            {["Expert Local Knowledge", "Fast Processing", "Transparent Pricing"].map((item) => (
              <View key={item} className="flex-row items-center gap-3">
                <View className="w-5 h-5 rounded-full bg-secondary/20 items-center justify-center">
                  <Text className="text-secondary font-bold text-[10px]">✓</Text>
                </View>
                <Text className="font-bold text-primary">{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* FAQ Section */}
        <View className="px-6 py-10 bg-gray-50">
          <Text className="text-2xl font-black text-primary mb-6">FAQ</Text>
          {faqs.map((faq, index) => (
            <View key={index} className="mb-4 bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <TouchableOpacity
                onPress={() => setOpenFaq(openFaq === index ? null : index)}
                className="p-5 flex-row items-center justify-between"
              >
                <Text className="font-bold text-primary flex-1 pr-4">{faq.question}</Text>
                <View className="w-6 h-6 rounded-full bg-secondary/10 items-center justify-center">
                  {openFaq === index ? <Minus size={14} color="#D4AF37" /> : <Plus size={14} color="#D4AF37" />}
                </View>
              </TouchableOpacity>
              {openFaq === index && (
                <View className="p-5 pt-0">
                  <Text className="text-gray-500 text-sm leading-relaxed">{faq.answer}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* CTA */}
        <View className="px-6 py-16 bg-primary">
          <Text className="text-3xl font-black text-white text-center mb-4">Ready to Start?</Text>
          <Text className="text-white/60 text-center mb-8">Contact us today for a free consultation.</Text>
          <TouchableOpacity className="bg-secondary p-5 rounded-full items-center shadow-lg shadow-secondary/40">
            <Text className="text-white font-black text-lg">Contact Us Now</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Info */}
        <View className="px-6 py-12 bg-primary border-t border-white/5">
          <View className="space-y-6">
            <View className="flex-row items-center gap-4">
              <MapPin size={20} color="#D4AF37" />
              <Text className="text-white/60 text-sm">Al Reem Tower, Doha, Qatar</Text>
            </View>
            <View className="flex-row items-center gap-4">
              <Phone size={20} color="#D4AF37" />
              <Text className="text-white/60 text-sm">+974 4455 6677</Text>
            </View>
            <View className="flex-row items-center gap-4">
              <Mail size={20} color="#D4AF37" />
              <Text className="text-white/60 text-sm">info@trek-group.com</Text>
            </View>
          </View>
          <Text className="text-white/20 text-center mt-12 text-[10px]">© 2026 Trek Group Qatar. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
