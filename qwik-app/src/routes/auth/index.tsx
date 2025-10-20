import { $, component$, useStore, useTask$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useAppContext } from '@/contexts/app-context';
import { sleep } from '@/lib/utils';
import { StoreIcon } from '@/components/icons';

interface AuthState {
  mode: 'login' | 'signup';
  isLoading: boolean;
}

export default component$(() => {
  const app = useAppContext();
  const navigate = useNavigate();
  const state = useStore<AuthState>({ mode: 'login', isLoading: false });

  useTask$(({ track }) => {
    track(() => app.state.user);
    if (app.state.user) {
      navigate('/');
    }
  });

  const handleLogin = $(async (event: Event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = String(formData.get('email') || '');
    const password = String(formData.get('password') || '');

    if (!email || !password) {
      app.addToast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    state.isLoading = true;
    await sleep(1000);
    const user = {
      id: Math.random().toString(36).slice(2, 9),
      email,
      name: email.split('@')[0],
    };
    app.setUser(user);
    app.addToast({
      title: 'Welcome back!',
      description: 'You have successfully logged in',
    });
    state.isLoading = false;
    navigate('/');
  });

  const handleSignup = $(async (event: Event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '');
    const email = String(formData.get('email') || '');
    const password = String(formData.get('password') || '');
    const confirmPassword = String(formData.get('confirmPassword') || '');

    if (!name || !email || !password || !confirmPassword) {
      app.addToast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    if (password !== confirmPassword) {
      app.addToast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      app.addToast({
        title: 'Error',
        description: 'Password must be at least 6 characters',
        variant: 'destructive',
      });
      return;
    }

    state.isLoading = true;
    await sleep(1000);
    const user = {
      id: Math.random().toString(36).slice(2, 9),
      email,
      name,
    };
    app.setUser(user);
    app.addToast({
      title: 'Account created!',
      description: 'Welcome to ShopHub',
    });
    state.isLoading = false;
    navigate('/');
  });

  return (
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/30 py-12 px-4">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <div class="flex items-center justify-center gap-2 mb-2">
            <StoreIcon class="h-8 w-8 text-primary" />
            <h1 class="text-3xl font-bold">ShopHub</h1>
          </div>
          <p class="text-muted-foreground">Your premium shopping destination</p>
        </div>

        <div class="mb-6 grid grid-cols-2 rounded-md border bg-muted/40 p-1 text-sm font-medium">
          <button
            class={`rounded-md px-3 py-2 transition ${
              state.mode === 'login' ? 'bg-white shadow text-foreground' : 'text-muted-foreground'
            }`}
            onClick$={() => (state.mode = 'login')}
          >
            Login
          </button>
          <button
            class={`rounded-md px-3 py-2 transition ${
              state.mode === 'signup' ? 'bg-white shadow text-foreground' : 'text-muted-foreground'
            }`}
            onClick$={() => (state.mode = 'signup')}
          >
            Sign Up
          </button>
        </div>

        {state.mode === 'login' ? (
          <Card>
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form preventdefault:submit onSubmit$={handleLogin} class="space-y-4">
                <div class="space-y-2">
                  <Label for="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                </div>
                <div class="space-y-2">
                  <Label for="password">Password</Label>
                  <Input id="password" name="password" type="password" placeholder="••••••••" required />
                </div>
                <Button type="submit" class="w-full" disabled={state.isLoading}>
                  {state.isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>Sign up to start shopping with exclusive deals</CardDescription>
            </CardHeader>
            <CardContent>
              <form preventdefault:submit onSubmit$={handleSignup} class="space-y-4">
                <div class="space-y-2">
                  <Label for="name">Full Name</Label>
                  <Input id="name" name="name" type="text" placeholder="John Doe" required />
                </div>
                <div class="space-y-2">
                  <Label for="signup-email">Email</Label>
                  <Input id="signup-email" name="email" type="email" placeholder="you@example.com" required />
                </div>
                <div class="space-y-2">
                  <Label for="signup-password">Password</Label>
                  <Input id="signup-password" name="password" type="password" placeholder="••••••••" required />
                </div>
                <div class="space-y-2">
                  <Label for="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" required />
                </div>
                <Button type="submit" class="w-full" disabled={state.isLoading}>
                  {state.isLoading ? 'Creating account...' : 'Sign Up'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
});
