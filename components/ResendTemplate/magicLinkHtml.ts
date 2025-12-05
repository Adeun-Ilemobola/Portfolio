// utils/magicLinkHtml.ts

export function magicLinkEmailHtml(opts: {
  url: string;
  token: string;
  mode?: "light" | "dark";
}): string {
  const { url, token, mode = "light" } = opts;
  const isDark = mode === "dark";

  const primary =         isDark ? "#1f2937" : "#ffffff";
  const accent =          isDark ? "#6ee7b7" : "#059669";
  const highlight =       isDark ? "#fda4af" : "#e11d48";
  const backgroundHex =   isDark ? "#020617" : "#e5f3ff";
  const glassBackground = isDark ? "rgba(15,23,42,0.82)" : "rgba(255,255,255,0.82)";
  const glassBorder =     isDark ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(255,255,255,0.7)";
  const shadowColor =     isDark ? "0 18px 45px rgba(15,23,42,0.8)" : "0 18px 45px rgba(15,23,42,0.18)";
  const textPrimary =     isDark ? "#e5e7eb" : "#0f172a";
  const textSecondary =   isDark ? "#9ca3af" : "#4b5563";
  const subtleLine =      isDark ? "rgba(148,163,184,0.4)" : "rgba(148,163,184,0.35)";


  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sign in</title>
  </head>
  <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif; background-color: ${backgroundHex};">
    <div style="padding:32px 16px;">
      <div style="
        max-width:520px;
        margin:0 auto;
        border-radius:24px;
        padding:28px 24px 24px;
        background-color: ${glassBackground};
        border: ${glassBorder};
        box-shadow: ${shadowColor};
        ">
        <!-- Accent tag -->
        <div style="margin-bottom:16px;">
          <span style="
            display:inline-block;
            padding:4px 10px;
            border-radius:999px;
            border: 1px solid ${isDark ? "rgba(148,163,184,0.45)" : "rgba(148,163,184,0.3)"};
            background-color: ${isDark ? "rgba(15,23,42,0.9)" : "rgba(255,255,255,0.9)"};
            box-shadow: ${isDark
              ? "0 10px 25px rgba(15,23,42,0.95)"
              : "0 10px 25px rgba(15,23,42,0.12)"};
          ">
            <span style="
              font-size:11px;
              text-transform:uppercase;
              letter-spacing:0.12em;
              font-weight:600;
              color: ${isDark ? "#e5e7eb" : "#4b5563"};
            ">
              Secure Magic Link
            </span>
          </span>
        </div>

        <!-- Heading -->
        <h1 style="
          font-size:24px;
          font-weight:700;
          margin:4px 0 10px;
          letter-spacing:-0.03em;
          color: ${textPrimary};
        ">
          Sign in with a single tap
        </h1>

        <!-- Intro copy -->
        <p style="
          font-size:14px;
          line-height:1.6;
          margin:0 0 20px;
          color: ${textSecondary};
        ">
          We generated a one-time magic link just for you. Use the button below to access your account without entering a password.
        </p>

        <!-- Magic link button -->
        <div style="text-align:center; margin-bottom:24px;">
          <a 
            href="${url}" 
            style="
              display:inline-block;
              padding:12px 26px;
              border-radius:999px;
              border:1px solid rgba(255,255,255,0.3);
              text-decoration:none;
              font-size:14px;
              font-weight:600;
              text-align:center;
              background-color: ${accent};
              color: ${primary};
              box-shadow: ${isDark
                ? "0 16px 35px rgba(16,185,129,0.65)"
                : "0 16px 35px rgba(5,150,105,0.4)"};
            "
          >
            Continue to your account
          </a>
        </div>

        <!-- Token pill -->
        <div style="
          margin-top:8px;
          margin-bottom:22px;
          padding:14px 14px 12px;
          border-radius:18px;
          border:1px solid ${subtleLine};
          background-color: ${isDark
            ? "rgba(15,23,42,0.96)"
            : "rgba(255,255,255,0.96)"};
          box-shadow: ${isDark
            ? "0 12px 30px rgba(15,23,42,0.9)"
            : "0 12px 30px rgba(15,23,42,0.1)"};
        ">
          <div style="
            font-size:11px;
            text-transform:uppercase;
            letter-spacing:0.12em;
            margin:0 0 6px;
            color: ${textSecondary};
          ">Your one-time token</div>
          <div style="
            font-family:SF Mono, ui-monospace, Menlo, Monaco, Consolas, Courier New, monospace;
            font-size:13px;
            font-weight:700;
            padding:6px 10px;
            border-radius:10px;
            margin:0 0 4px;
            color: ${textPrimary};
            background: linear-gradient(135deg, ${highlight}20, ${highlight}40);
            border: 1px solid ${highlight}50;
            word-break: break-all;
          ">
            ${token}
          </div>
          <div style="
            font-size:12px;
            margin:4px 0 0;
            color: ${textSecondary};
          ">
            If the button above doesn’t work, you can copy this token and use it on the sign-in page.
          </div>
        </div>

        <hr style="border:none; border-top:1px solid ${subtleLine}; margin:4px 0 14px;" />

        <!-- Link fallback -->
        <div style="margin-bottom:18px;">
          <div style="
            font-size:13px;
            font-weight:600;
            margin:0 0 4px;
            color: ${textPrimary};
          ">Can't click the button?</div>
          <div style="
            font-size:12px;
            margin:0 0 6px;
            color: ${textSecondary};
          ">
            Paste this link into your browser:
          </div>
          <a href="${url}" style="
            font-size:12px;
            line-height:1.5;
            word-break:break-all;
            text-decoration:none;
            color: ${accent};
            border-bottom:1px solid ${accent}80;
          ">
            ${url}
          </a>
        </div>

        <!-- Security note -->
        <div style="margin-top:4px;">
          <div style="
            font-size:11px;
            text-transform:uppercase;
            letter-spacing:0.14em;
            margin:0 0 6px;
            color: ${textSecondary};
          ">Security tip</div>
          <div style="
            font-size:11px;
            line-height:1.6;
            margin:0;
            color: ${textSecondary};
          ">
            This magic link will expire after a short time and can only be used once. If you didn’t request this, you can safely ignore this email.
          </div>
        </div>

      </div>
    </div>
  </body>
</html>`;
}
