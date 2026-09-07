import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CtaButton } from "@/components/site/ui";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Owner Sign In — The Villa @Watamu" },
      {
        name: "description",
        content: "Private sign-in for The Villa @Watamu owners to review booking requests and enquiries.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Owner Sign In — The Villa @Watamu" },
      { property: "og:description", content: "Private area for villa owners." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 pb-24 pt-36 md:pt-44">
      <p className="eyebrow">Private</p>
      <h1 className="mt-4 font-display text-4xl text-ink">
        {mode === "signin" ? "Owner Sign In" : "Create Your Account"}
      </h1>
      <span className="rule-gold mt-5" />

      {sent ? (
        <div className="mt-8 border border-gold/40 bg-gold/5 p-6 text-sm leading-7">
          <p>
            Almost there — we've emailed <strong>{email}</strong> a confirmation link. Click it,
            then come back here and sign in.
          </p>
          <button
            type="button"
            className="mt-5 font-sans text-[0.62rem] uppercase tracking-[0.2em] text-gold hover:underline"
            onClick={() => {
              setSent(false);
              setMode("signin");
              setPassword("");
              setConfirm("");
            }}
          >
            Go to sign in
          </button>
        </div>
      ) : (
        <>
          <form
            className="mt-8 space-y-5"
            onSubmit={async (e) => {
              e.preventDefault();
              if (busy) return;
              if (mode === "signup" && password !== confirm) {
                toast.error("Those passwords don't match.");
                return;
              }
              setBusy(true);
              const { data, error } =
                mode === "signin"
                  ? await supabase.auth.signInWithPassword({ email, password })
                  : await supabase.auth.signUp({
                      email,
                      password,
                      options: {
                        emailRedirectTo: `${window.location.origin}/auth`,
                        data: { full_name: name },
                      },
                    });
              setBusy(false);
              if (error) {
                toast.error(error.message);
                return;
              }
              if (mode === "signup") {
                if (data.session) {
                  toast.success("Account created.");
                  navigate({ to: "/admin" });
                } else {
                  setSent(true);
                }
                return;
              }
              toast.success("Welcome back.");
              navigate({ to: "/admin" });
            }}
          >
            {mode === "signup" && (
              <div>
                <label htmlFor="adminname" className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Name
                </label>
                <input
                  id="adminname"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-3 w-full border border-input bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
                />
              </div>
            )}
            <div>
              <label htmlFor="adminemail" className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                Email
              </label>
              <input
                id="adminemail"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-3 w-full border border-input bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="adminpass" className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                Password
              </label>
              <input
                id="adminpass"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-3 w-full border border-input bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            {mode === "signup" && (
              <div>
                <label htmlFor="adminconfirm" className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Confirm password
                </label>
                <input
                  id="adminconfirm"
                  type="password"
                  required
                  minLength={6}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="mt-3 w-full border border-input bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
                />
              </div>
            )}
            <CtaButton type="submit" disabled={busy} className="w-full">
              {busy ? "…" : mode === "signin" ? "Sign In" : "Create Account"}
            </CtaButton>
          </form>
          <button
            type="button"
            className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-gold"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          >
            {mode === "signin" ? "First time? Create the owner account" : "Already have an account? Sign in"}
          </button>
        </>
      )}
    </div>
  );
}
