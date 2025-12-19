import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GovHeader } from '@/components/shared/GovHeader';
import { Footer } from '@/components/shared/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, ArrowRight, Users, Building2, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockLogin } from '@/store/slices/userSlice';

export default function Login() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'tenant';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roleConfig = {
    tenant: {
      title: 'Citizen Login',
      icon: Users,
      color: 'primary',
      dashboard: '/tenant/dashboard',
      demoCredentials: { phone: '98765 43210', otp: '123456' },
    },
    landlord: {
      title: 'Landlord Login',
      icon: Building2,
      color: 'accent',
      dashboard: '/landlord/dashboard',
      demoCredentials: { phone: '91234 56789', otp: '123456' },
    },
    admin: {
      title: 'MHADA Admin Login',
      icon: Shield,
      color: 'success',
      dashboard: '/admin/dashboard',
      demoCredentials: { phone: '90000 00001', otp: '123456', role: 'MHADA State Admin' },
    },
  };

  const config = roleConfig[role] || roleConfig.tenant;

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      toast({
        title: 'Invalid Phone Number',
        description: 'Please enter a valid 10-digit phone number',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setOtpSent(true);
    setIsLoading(false);
    toast({
      title: 'OTP Sent',
      description: `OTP has been sent to +91 ${phone}`,
    });
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter the 6-digit OTP',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Mock login with Redux
    dispatch(mockLogin({
      user: {
        id: '1',
        name: 'Rahul Sharma',
        phone: phone,
        email: 'rahul.sharma@email.com',
      },
      role: role,
      verificationStatus: {
        ekyc: 'verified',
        digilocker: 'verified',
        policeVerification: 'pending',
        profileCompletion: 85,
      },
    }));
    
    setIsLoading(false);
    toast({
      title: 'Login Successful',
      description: 'Welcome to the Maharashtra Rental Housing Portal',
    });
    navigate(config.dashboard);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <GovHeader showAuth={false} />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Card variant="elevated" className="overflow-hidden">
            <div className={`h-1.5 bg-${config.color}`} />
            
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <config.icon className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">{config.title}</CardTitle>
              <CardDescription>
                Enter your mobile number to receive OTP
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <Tabs defaultValue="phone" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="phone">Phone OTP</TabsTrigger>
                  <TabsTrigger value="aadhaar">Aadhaar OTP</TabsTrigger>
                </TabsList>

                <TabsContent value="phone" className="space-y-4 mt-4">
                  {!otpSent ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Mobile Number</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            +91
                          </span>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="Enter 10-digit mobile number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            className="pl-12"
                            maxLength={10}
                          />
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        onClick={handleSendOtp}
                        disabled={isLoading || phone.length !== 10}
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Sending OTP...
                          </span>
                        ) : (
                          <>
                            Send OTP
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-center p-4 rounded-lg bg-success-light">
                        <CheckCircle2 className="h-6 w-6 text-success mx-auto mb-2" />
                        <p className="text-sm text-success">OTP sent to +91 {phone}</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="otp">Enter OTP</Label>
                        <Input
                          id="otp"
                          type="text"
                          placeholder="Enter 6-digit OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          maxLength={6}
                          className="text-center text-lg tracking-widest"
                        />
                      </div>

                      <Button
                        className="w-full"
                        onClick={handleVerifyOtp}
                        disabled={isLoading || otp.length !== 6}
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Verifying...
                          </span>
                        ) : (
                          <>
                            Verify & Login
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </Button>

                      <button
                        onClick={() => {
                          setOtpSent(false);
                          setOtp('');
                        }}
                        className="w-full text-sm text-muted-foreground hover:text-foreground"
                      >
                        Change phone number
                      </button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="aadhaar" className="space-y-4 mt-4">
                  <div className="text-center p-6 rounded-lg bg-muted">
                    <Shield className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Aadhaar authentication is powered by UIDAI. Your Aadhaar number will be verified securely.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aadhaar">Aadhaar Number</Label>
                    <Input
                      id="aadhaar"
                      type="text"
                      placeholder="XXXX XXXX XXXX"
                      className="text-center tracking-wider"
                    />
                  </div>

                  <Button className="w-full" variant="govPrimary">
                    Verify with Aadhaar
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </TabsContent>
              </Tabs>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    New to the portal?
                  </span>
                </div>
              </div>

              <Button
                variant="govOutline"
                className="w-full"
                onClick={() => navigate(`/register?role=${role}`)}
              >
                Create New Account
              </Button>

              {/* Demo Credentials */}
              <div className="mt-4 p-3 rounded-lg bg-info/10 border border-info/20">
                <p className="text-xs font-medium text-info mb-2">Demo Credentials (For Testing)</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p><span className="font-medium">Mobile:</span> {config.demoCredentials.phone}</p>
                  <p><span className="font-medium">OTP:</span> {config.demoCredentials.otp}</p>
                  {role === 'admin' && config.demoCredentials.role && (
                    <p><span className="font-medium">Role:</span> {config.demoCredentials.role}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Having trouble logging in?{' '}
            <a href="/grievance" className="text-primary hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
