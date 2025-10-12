import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Storage, showConfirmDialog } from './utils/storage';

// Types
interface Content {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  tags: string[];
  author: {
    id: string;
    username: string;
    avatar: string | null;
  };
  _count: {
    chapters: number;
    bookmarks: number;
  };
}

interface User {
  id: string;
  email: string;
  username: string;
  avatar: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
}

const API_BASE_URL = Platform.OS === 'web' ? 'http://localhost:3001' : 'http://192.168.1.15:3001';

// Screens
function LoginScreen({ navigation, onLogin }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      console.log('Attempting login with:', { email, password: '***' });
      
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Login response status:', response.status);
      const data = await response.json();
      console.log('Login response data:', data);

      if (response.ok) {
        console.log('Login successful');
        await onLogin(data.user, data.token);
      } else {
        console.error('Login failed:', data.error);
        Alert.alert('Login Failed', data.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Connection Error', 'Unable to connect to server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      console.log('Attempting registration with:', { email, password: '***' });
      
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          username: email.split('@')[0], 
          password 
        }),
      });

      console.log('Registration response status:', response.status);
      const data = await response.json();
      console.log('Registration response data:', data);

      if (response.ok) {
        console.log('Registration successful');
        await onLogin(data.user, data.token);
      } else {
        console.error('Registration failed:', data.error);
        Alert.alert('Registration Failed', data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Connection Error', 'Unable to connect to server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.loginContainer}>
      <View style={styles.loginContent}>
        <Text style={styles.loginTitle}>Brouhaha</Text>
        <Text style={styles.loginSubtitle}>Media Platform</Text>
        
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#999"
          />
          
          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={login}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton, loading && styles.buttonDisabled]} 
            onPress={register}
            disabled={loading}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="light" />
    </LinearGradient>
  );
}

function HomeScreen({ user }: { user: User }) {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/content`);
      const data = await response.json();
      setContent(data.content || []);
    } catch (error) {
      console.error('Error fetching content:', error);
      Alert.alert('Error', 'Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Loading content...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back, {user.username}!</Text>
        <Text style={styles.roleText}>{user.role}</Text>
      </View>

      <Text style={styles.sectionTitle}>Featured Content</Text>
      
      {content.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No content available yet</Text>
          <Text style={styles.emptySubtext}>Check back later for new content!</Text>
        </View>
      ) : (
        content.map((item) => (
          <View key={item.id} style={styles.contentCard}>
            <Text style={styles.contentTitle}>{item.title}</Text>
            <Text style={styles.contentDescription}>{item.description}</Text>
            <View style={styles.contentMeta}>
              <Text style={styles.contentType}>{item.type}</Text>
              <Text style={styles.contentAuthor}>by {item.author.username}</Text>
            </View>
            <View style={styles.contentStats}>
              <Text style={styles.statText}>{item._count.chapters} chapters</Text>
              <Text style={styles.statText}>{item._count.bookmarks} bookmarks</Text>
            </View>
            <View style={styles.tagsContainer}>
              {item.tags.map((tag, index) => (
                <Text key={index} style={styles.tag}>{tag}</Text>
              ))}
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

function SubscriptionScreen({ user }: { user: User }) {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/stripe/plans`);
      const data = await response.json();
      setPlans(data.plans || []);
    } catch (error) {
      console.error('Error fetching plans:', error);
      Alert.alert('Error', 'Failed to fetch subscription plans');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Loading plans...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Subscription Plans</Text>
        <Text style={styles.screenSubtitle}>Choose the plan that works for you</Text>
      </View>

      {plans.map((plan) => (
        <View key={plan.id} style={styles.planCard}>
          <View style={styles.planHeader}>
            <Text style={styles.planName}>{plan.name}</Text>
            <Text style={styles.planPrice}>
              {formatPrice(plan.price)}/{plan.interval}
            </Text>
          </View>
          <Text style={styles.planDescription}>{plan.description}</Text>
          <View style={styles.featuresContainer}>
            {plan.features.map((feature, index) => (
              <Text key={index} style={styles.feature}>
                ✓ {feature}
              </Text>
            ))}
          </View>
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeButtonText}>Subscribe</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

function ProfileScreen({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editUsername, setEditUsername] = useState(user.username);
  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const logout = async () => {
    try {
      const confirmed = await showConfirmDialog('Sign Out', 'Are you sure you want to sign out?');
      if (confirmed) {
        setLoggingOut(true);
        
        setTimeout(async () => {
          await onLogout();
          setLoggingOut(false);
        }, 500);
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback to Alert.alert for mobile
      Alert.alert(
        'Sign Out',
        'Are you sure you want to sign out?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Sign Out', 
            style: 'destructive',
            onPress: async () => {
              setLoggingOut(true);
              
              setTimeout(async () => {
                await onLogout();
                setLoggingOut(false);
              }, 500);
            }
          }
        ]
      );
    }
  };

  const updateProfile = async () => {
    if (!editUsername.trim()) {
      Alert.alert('Error', 'Username cannot be empty');
      return;
    }

    setLoading(true);
    try {
      // Get the auth token from secure storage
      const token = await Storage.getItem('authToken');
      
      const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ username: editUsername }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Profile updated successfully');
        setIsEditing(false);
        // Update the user object in the parent component
        // This would require lifting state up or using a context
      } else {
        Alert.alert('Error', data.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditUsername(user.username);
    setIsEditing(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Profile</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.profileInfo}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>
              {user.username.charAt(0).toUpperCase()}
            </Text>
          </View>
          
          {isEditing ? (
            <View style={styles.editForm}>
              <TextInput
                style={styles.editInput}
                value={editUsername}
                onChangeText={setEditUsername}
                placeholder="Username"
                autoCapitalize="none"
              />
              <View style={styles.editButtons}>
                <TouchableOpacity 
                  style={[styles.editButton, styles.saveButton]} 
                  onPress={updateProfile}
                  disabled={loading}
                >
                  <Text style={styles.saveButtonText}>
                    {loading ? 'Saving...' : 'Save'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.editButton, styles.cancelButton]} 
                  onPress={cancelEdit}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>{user.username}</Text>
              <Text style={styles.profileEmail}>{user.email}</Text>
              <Text style={styles.profileRole}>Role: {user.role || 'READER'}</Text>
              <Text style={styles.profileDate}>
                Member since: {new Date(user.createdAt).toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.profileActions}>
          {!isEditing && (
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.actionButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Account Settings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Privacy & Security</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Help & Support</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>About Brouhaha</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.logoutButton, loggingOut && styles.buttonDisabled]} 
            onPress={logout}
            disabled={loggingOut}
          >
            <Text style={[styles.actionButtonText, styles.logoutButtonText]}>
              {loggingOut ? 'Signing Out...' : 'Sign Out'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

// Navigation
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs({ user, onLogout }: any) {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Subscription') {
            iconName = focused ? 'card' : 'card-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#667eea',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={() => <HomeScreen user={user} />} />
      <Tab.Screen name="Subscription" component={() => <SubscriptionScreen user={user} />} />
      <Tab.Screen name="Profile" component={(props) => <ProfileScreen user={user} onLogout={onLogout} />} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await Storage.getItem('authToken');
      if (!token) {
        setIsLoading(false);
        return;
      }

      console.log('Checking auth status with token:', token.substring(0, 20) + '...');
      
      const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User authenticated:', data.user);
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        console.log('Token invalid, clearing storage');
        await Storage.removeItem('authToken');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      await Storage.removeItem('authToken');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (userData: User, token: string) => {
    setUser(userData);
    setIsAuthenticated(true);
    await Storage.setItem('authToken', token);
  };

  const handleLogout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    await Storage.removeItem('authToken');
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Main">
            {(props) => <MainTabs {...props} user={user} onLogout={handleLogout} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // Login styles
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContent: {
    width: '90%',
    maxWidth: 400,
  },
  loginTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  loginSubtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.9,
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 30,
    backdropFilter: 'blur(10px)',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#fff',
  },
  buttonText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#fff',
  },

  // Common styles
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  roleText: {
    fontSize: 14,
    color: '#667eea',
    marginTop: 4,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  screenSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },

  // Content styles
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    margin: 20,
    marginBottom: 10,
  },
  contentCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  contentDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  contentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  contentType: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  contentAuthor: {
    fontSize: 12,
    color: '#999',
  },
  contentStats: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  statText: {
    fontSize: 12,
    color: '#999',
    marginRight: 15,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#e9ecef',
    color: '#666',
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },

  // Subscription styles
  planCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  planPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#667eea',
  },
  planDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  feature: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  subscribeButton: {
    backgroundColor: '#667eea',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  subscribeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Profile styles
  profileCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileAvatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileDetails: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    color: '#667eea',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 4,
  },
  profileDate: {
    fontSize: 12,
    color: '#999',
  },
  editForm: {
    width: '100%',
    alignItems: 'center',
  },
  editInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    width: '100%',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  editButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    borderRadius: 8,
    padding: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#667eea',
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  profileActions: {
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#fff',
  },
});