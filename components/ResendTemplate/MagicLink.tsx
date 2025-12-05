import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type MagicLinkEmailProps = {
  url: string;
  token: string;
  mode?: "light" | "dark";
};

export default function MagicLinkEmail({
  url,
  token,
  mode = "light",
}: MagicLinkEmailProps) {
  const isDark = mode === "dark";

  // Color tokens
  const primary = isDark ? "#1f2937" : "#ffffff";
  const accent = isDark ? "#6ee7b7" : "#059669";
  const highlight = isDark ? "#fda4af" : "#e11d48";

  const backgroundHex = isDark ? "#020617" : "#e5f3ff";

  const glassBackground = isDark
    ? "rgba(15,23,42,0.82)"
    : "rgba(255,255,255,0.82)";

  const glassBorder = isDark
    ? "1px solid rgba(255,255,255,0.18)"
    : "1px solid rgba(255,255,255,0.7)";

  const shadowColor = isDark
    ? "0 18px 45px rgba(15,23,42,0.8)"
    : "0 18px 45px rgba(15,23,42,0.18)";

  const textPrimary = isDark ? "#e5e7eb" : "#0f172a";
  const textSecondary = isDark ? "#9ca3af" : "#4b5563";
  const subtleLine = isDark ? "rgba(148,163,184,0.4)" : "rgba(148,163,184,0.35)";

  const magicLinkUrl = `${url}${url.includes("?") ? "&" : "?"}token=${encodeURIComponent(
    token,
  )}`;

  return (
    <Html>
      <Head />
      <Preview>Tap your secure sign-in link — valid for one use.</Preview>
      <Body
        style={{
          margin: 0,
          padding: 0,
          fontFamily:
            '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
          backgroundColor: backgroundHex, // solid hex fallback
          backgroundImage: isDark
            ? "radial-gradient(circle at 0% 0%, #22c55e 0, transparent 45%), radial-gradient(circle at 100% 0%, #f97316 0, transparent 40%), radial-gradient(circle at 0% 100%, #0ea5e9 0, transparent 45%), radial-gradient(circle at 100% 100%, #f43f5e 0, transparent 45%)"
            : "radial-gradient(circle at 0% 0%, #a5b4fc 0, transparent 45%), radial-gradient(circle at 100% 0%, #6ee7b7 0, transparent 40%), radial-gradient(circle at 0% 100%, #bfdbfe 0, transparent 45%), radial-gradient(circle at 100% 100%, #fecaca 0, transparent 45%)",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "scroll",
        }}
      >
        <Section style={outerSection}>
          <Container style={glassContainer(glassBackground, glassBorder, shadowColor)}>
            {/* Accent tag */}
            <Section style={pillRow}>
              <Section style={pillContainer(accent, primary, isDark)}>
                <Text style={pillText(isDark)}>Secure Magic Link</Text>
              </Section>
            </Section>

            {/* Heading */}
            <Heading as="h1" style={heading(textPrimary)}>
              Sign in with a single tap
            </Heading>

            {/* Intro copy */}
            <Text style={bodyText(textSecondary)}>
              We generated a one-time magic link just for you. Use the button below
              to access your account without entering a password.
            </Text>

            {/* Magic link button */}
            <Section style={buttonRow}>
              <Button
                href={magicLinkUrl}
                style={buttonStyle(accent, primary, isDark)}
              >
                Continue to your account
              </Button>
            </Section>

            {/* Token pill */}
            <Section style={tokenSection(subtleLine, glassBackground, isDark)}>
              <Text style={tokenLabel(textSecondary)}>Your one-time token</Text>
              <Text style={tokenValue(highlight, textPrimary)}>{token}</Text>
              <Text style={tokenHint(textSecondary)}>
                If the button above doesn&apos;t work, you can copy this token and use
                it on the sign-in page.
              </Text>
            </Section>

            <Section style={dividerSection(subtleLine)} />

            {/* Link fallback */}
            <Section style={fallbackSection}>
              <Text style={fallbackTitle(textPrimary)}>Can&apos;t click the button?</Text>
              <Text style={fallbackText(textSecondary)}>
                Paste this link into your browser:
              </Text>
              <Link href={magicLinkUrl} style={linkStyle(accent, isDark)}>
                {magicLinkUrl}
              </Link>
            </Section>

            {/* Security note */}
            <Section style={footerSection}>
              <Text style={footerTitle(textSecondary)}>Security tip</Text>
              <Text style={footerText(textSecondary)}>
                This magic link will expire after a short time and can only be used
                once. If you didn&apos;t request this, you can safely ignore this email.
              </Text>
            </Section>
          </Container>
        </Section>
      </Body>
    </Html>
  );
}

const outerSection: React.CSSProperties = {
  padding: "32px 16px",
};

const glassContainer = (
  glassBackground: string,
  glassBorder: string,
  shadowColor: string,
): React.CSSProperties => ({
  maxWidth: "520px",
  margin: "0 auto",
  borderRadius: "24px",
  padding: "28px 24px 24px",
  backgroundColor: glassBackground,
  border: glassBorder,
  boxShadow: shadowColor,
  // Some clients ignore this, but it enhances visual fidelity where supported
  WebkitBackdropFilter: "blur(16px)",
  backdropFilter: "blur(16px)",
});

const pillRow: React.CSSProperties = {
  marginBottom: "16px",
};

const pillContainer = (
  accent: string,
  primary: string,
  isDark: boolean,
): React.CSSProperties => ({
  display: "inline-block",
  padding: "4px 10px",
  borderRadius: "999px",
  border: isDark ? "1px solid rgba(148,163,184,0.45)" : "1px solid rgba(148,163,184,0.3)",
  backgroundColor: isDark
    ? "rgba(15,23,42,0.9)"
    : "rgba(255,255,255,0.9)",
  boxShadow: isDark
    ? "0 10px 25px rgba(15,23,42,0.95)"
    : "0 10px 25px rgba(15,23,42,0.12)",
});

const pillText = (isDark: boolean): React.CSSProperties => ({
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontWeight: 600,
  color: isDark ? "#e5e7eb" : "#4b5563",
  margin: 0,
});

const heading = (textPrimary: string): React.CSSProperties => ({
  fontSize: "24px",
  fontWeight: 700,
  margin: "4px 0 10px",
  letterSpacing: "-0.03em",
  color: textPrimary,
});

const bodyText = (textSecondary: string): React.CSSProperties => ({
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0 0 20px",
  color: textSecondary,
});

const buttonRow: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "24px",
};

const buttonStyle = (
  accent: string,
  primary: string,
  isDark: boolean,
): React.CSSProperties => ({
  display: "inline-block",
  padding: "12px 26px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.3)",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 600,
  textAlign: "center",
  backgroundColor: accent,
  color: primary,
  boxShadow: isDark
    ? "0 16px 35px rgba(16,185,129,0.65)"
    : "0 16px 35px rgba(5,150,105,0.4)",
});

const tokenSection = (
  subtleLine: string,
  glassBackground: string,
  isDark: boolean,
): React.CSSProperties => ({
  marginTop: "8px",
  marginBottom: "22px",
  padding: "14px 14px 12px",
  borderRadius: "18px",
  border: `1px solid ${subtleLine}`,
  backgroundColor: isDark
    ? "rgba(15,23,42,0.96)"
    : "rgba(255,255,255,0.96)",
  boxShadow: isDark
    ? "0 12px 30px rgba(15,23,42,0.9)"
    : "0 12px 30px rgba(15,23,42,0.1)",
});

const tokenLabel = (textSecondary: string): React.CSSProperties => ({
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  margin: "0 0 6px",
  color: textSecondary,
});

const tokenValue = (highlight: string, textPrimary: string): React.CSSProperties => ({
  fontFamily: '"SF Mono", ui-monospace, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: "13px",
  fontWeight: 700,
  padding: "6px 10px",
  borderRadius: "10px",
  margin: "0 0 4px",
  color: textPrimary,
  background: `linear-gradient(135deg, ${highlight}20, ${highlight}40)`,
  border: `1px solid ${highlight}50`,
  wordBreak: "break-all",
});

const tokenHint = (textSecondary: string): React.CSSProperties => ({
  fontSize: "12px",
  margin: "4px 0 0",
  color: textSecondary,
});

const dividerSection = (subtleLine: string): React.CSSProperties => ({
  borderBottom: `1px solid ${subtleLine}`,
  margin: "4px 0 14px",
});

const fallbackSection: React.CSSProperties = {
  marginBottom: "18px",
};

const fallbackTitle = (textPrimary: string): React.CSSProperties => ({
  fontSize: "13px",
  fontWeight: 600,
  margin: "0 0 4px",
  color: textPrimary,
});

const fallbackText = (textSecondary: string): React.CSSProperties => ({
  fontSize: "12px",
  margin: "0 0 6px",
  color: textSecondary,
});

const linkStyle = (accent: string, isDark: boolean): React.CSSProperties => ({
  fontSize: "12px",
  lineHeight: "1.5",
  wordBreak: "break-all",
  textDecoration: "none",
  color: accent,
  borderBottom: `1px solid ${accent}80`,
});

const footerSection: React.CSSProperties = {
  marginTop: "4px",
};

const footerTitle = (textSecondary: string): React.CSSProperties => ({
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  margin: "0 0 6px",
  color: textSecondary,
});

const footerText = (textSecondary: string): React.CSSProperties => ({
  fontSize: "11px",
  lineHeight: "1.6",
  margin: 0,
  color: textSecondary,
});
