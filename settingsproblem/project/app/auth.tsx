import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { ArrowLeft, Upload, Check } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthScreen() {
  const { mode } = useLocalSearchParams();
  const { login, signup, verifyStudent } = useAuth();
  const [currentStep, setCurrentStep] = useState<string>(mode as string || 'login');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    loginEmail: '',
    loginPassword: '',
  });

  const handleVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      setTimeout(async () => {
        await verifyStudent();
        router.replace('/(tabs)');
      }, 2000);
    }, 3000);
  };

  const handleLogin = async () => {
    try {
      await login(formData.loginEmail, formData.loginPassword);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleSignup = async () => {
    try {
      await signup(formData);
      setCurrentStep('verification');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const LoginForm = () => (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color="white" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Sign in to your VAR LIFE account</Text>
      
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9ca3af"
          keyboardType="email-address"
          value={formData.loginEmail}
          onChangeText={(text) => setFormData(prev => ({ ...prev, loginEmail: text }))}
        />
        <TextInput 
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#9ca3af"
          secureTextEntry
          value={formData.loginPassword}
          onChangeText={(text) => setFormData(prev => ({ ...prev, loginPassword: text }))}
        />
      </View>
      
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={handleLogin}
      >
        <Text style={styles.primaryButtonText}>Sign In</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
      </TouchableOpacity>
    </View>
  );

  const SignUpForm = () => (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color="white" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Create your account</Text>
      <Text style={styles.subtitle}>Join the verified student community in Mpumalanga</Text>
      
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder="First name"
          placeholderTextColor="#9ca3af"
          value={formData.firstName}
          onChangeText={(text) => setFormData(prev => ({ ...prev, firstName: text }))}
        />
        <TextInput 
          style={styles.input}
          placeholder="Last name"
          placeholderTextColor="#9ca3af"
          value={formData.lastName}
          onChangeText={(text) => setFormData(prev => ({ ...prev, lastName: text }))}
        />
        <TextInput 
          style={styles.input}
          placeholder="Email (e.g., student@ump.ac.za)"
          placeholderTextColor="#9ca3af"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
        />
        <TextInput 
          style={styles.input}
          placeholder="Phone number (+27)"
          placeholderTextColor="#9ca3af"
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
        />
        <TextInput 
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#9ca3af"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
        />
      </View>
      
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={handleSignup}
      >
        <Text style={styles.primaryButtonText}>Continue to Student Verification</Text>
      </TouchableOpacity>
      
      <Text style={styles.termsText}>
        By continuing, you agree to our Terms of Service and Privacy Policy
      </Text>
    </View>
  );

  const VerificationForm = () => (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => setCurrentStep('signup')}
      >
        <ArrowLeft size={24} color="white" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Verify your student status</Text>
      <Text style={styles.subtitle}>We use SheerID to verify your enrollment at UMP or other institutions</Text>
      
      {!isVerifying && !isVerified && (
        <ScrollView style={styles.verificationContent} showsVerticalScrollIndicator={false}>
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input}
              placeholder="Student email (.ac.za or .edu address)"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
            />
          </View>
          
          <TouchableOpacity style={styles.uploadArea}>
            <Upload size={48} color="#9ca3af" />
            <Text style={styles.uploadText}>Upload Student ID or Enrollment Letter</Text>
            <Text style={styles.uploadSubtext}>JPG, PNG, or PDF up to 10MB</Text>
          </TouchableOpacity>
          
          <View style={styles.verificationInfo}>
            <Text style={styles.verificationInfoTitle}>What we verify:</Text>
            <Text style={styles.verificationInfoText}>• Current enrollment status</Text>
            <Text style={styles.verificationInfoText}>• University of Mpumalanga affiliation</Text>
            <Text style={styles.verificationInfoText}>• Student ID validity</Text>
            <Text style={styles.verificationInfoText}>• Academic year confirmation</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.verifyButton}
            onPress={handleVerification}
          >
            <Text style={styles.verifyButtonText}>Verify Student Status</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
      
      {isVerifying && (
        <View style={styles.verifyingContainer}>
          <ActivityIndicator size="large" color="white" />
          <Text style={styles.verifyingTitle}>Verifying your status...</Text>
          <Text style={styles.verifyingSubtitle}>This may take a moment</Text>
        </View>
      )}
      
      {isVerified && (
        <View style={styles.verifiedContainer}>
          <View style={styles.verifiedIcon}>
            <Check size={40} color="white" />
          </View>
          <Text style={styles.verifiedTitle}>Verification Complete!</Text>
          <Text style={styles.verifiedSubtitle}>Welcome to VAR LIFE Mpumalanga</Text>
        </View>
      )}
    </ScrollView>
  );

  const renderForm = () => {
    switch (currentStep) {
      case 'login':
        return <LoginForm />;
      case 'signup':
        return <SignUpForm />;
      case 'verification':
        return <VerificationForm />;
      default:
        return <LoginForm />;
    }
  };

  return renderForm();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    padding: 24,
    flexGrow: 1,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 24,
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#d1d5db',
    marginBottom: 32,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 32,
  },
  input: {
    backgroundColor: 'rgba(55, 65, 81, 0.5)',
    borderWidth: 1,
    borderColor: '#4b5563',
    borderRadius: 12,
    padding: 16,
    color: 'white',
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 24,
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 24,
  },
  forgotPasswordText: {
    color: '#9ca3af',
    fontSize: 16,
  },
  verificationContent: {
    flex: 1,
  },
  verificationInfo: {
    backgroundColor: 'rgba(55, 65, 81, 0.3)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  verificationInfoTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  verificationInfoText: {
    color: '#d1d5db',
    fontSize: 14,
    marginBottom: 4,
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: '#4b5563',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    marginBottom: 32,
  },
  uploadText: {
    color: '#d1d5db',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  uploadSubtext: {
    color: '#6b7280',
    fontSize: 14,
  },
  verifyButton: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  verifyingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 24,
    marginBottom: 12,
  },
  verifyingSubtitle: {
    fontSize: 18,
    color: '#d1d5db',
  },
  verifiedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#10b981',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  verifiedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 12,
  },
  verifiedSubtitle: {
    fontSize: 18,
    color: '#d1d5db',
  },
});