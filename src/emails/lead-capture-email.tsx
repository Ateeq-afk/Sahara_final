import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Button,
} from "@react-email/components";
import * as React from "react";

interface LeadCaptureEmailProps {
  name: string;
  email: string;
  phone?: string;
  leadType: "lead-magnet" | "exit-intent";
  downloadItem?: string;
  interestedIn?: string;
  submittedAt: string;
}

export const LeadCaptureEmail = ({
  name,
  email,
  phone,
  leadType,
  downloadItem,
  interestedIn,
  submittedAt,
}: LeadCaptureEmailProps) => {
  const leadTypeTitle = leadType === "lead-magnet" 
    ? "New Lead Magnet Download" 
    : "Exit Intent Lead Captured";
    
  const leadIcon = leadType === "lead-magnet" ? "📥" : "🎯";

  return (
    <Html>
      <Head />
      <Preview>{leadTypeTitle} - {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src="https://sahara-developers.com/logo.png"
              width="150"
              height="50"
              alt="Sahara Developers"
            />
          </Section>

          <Section style={headerSection}>
            <Text style={icon}>{leadIcon}</Text>
            <Heading style={h1}>{leadTypeTitle}</Heading>
          </Section>
          
          <Section style={leadInfoSection}>
            <Text style={leadDetail}>
              <strong>Name:</strong> {name}
            </Text>
            <Text style={leadDetail}>
              <strong>Email:</strong>{" "}
              <Link href={`mailto:${email}`} style={link}>
                {email}
              </Link>
            </Text>
            {phone && (
              <Text style={leadDetail}>
                <strong>Phone:</strong>{" "}
                <Link href={`tel:${phone}`} style={link}>
                  {phone}
                </Link>
              </Text>
            )}
            {downloadItem && (
              <Text style={leadDetail}>
                <strong>Downloaded:</strong> {downloadItem}
              </Text>
            )}
            {interestedIn && (
              <Text style={leadDetail}>
                <strong>Interested In:</strong> {interestedIn}
              </Text>
            )}
          </Section>

          <Section style={scoreSection}>
            <Text style={scoreTitle}>Lead Score</Text>
            <Text style={scoreValue}>
              {leadType === "lead-magnet" ? "🔥 Hot Lead" : "🌟 Warm Lead"}
            </Text>
            <Text style={scoreDescription}>
              {leadType === "lead-magnet" 
                ? "User actively downloaded content - high engagement"
                : "User showed interest before leaving - follow up quickly"}
            </Text>
          </Section>

          <Section style={actionSection}>
            <Text style={actionTitle}>Next Steps</Text>
            <Section style={actionButtons}>
              <Button
                href={`mailto:${email}?subject=Thank you for your interest in Sahara Developers`}
                style={primaryButton}
              >
                Send Welcome Email
              </Button>
              <Button
                href={`tel:${phone || ""}`}
                style={secondaryButton}
              >
                Call Lead
              </Button>
            </Section>
          </Section>

          <Section style={nurturingSection}>
            <Text style={nurturingTitle}>Recommended Nurturing Sequence</Text>
            <Text style={nurturingItem}>
              Day 1: Welcome email with additional resources
            </Text>
            <Text style={nurturingItem}>
              Day 3: Case study or project showcase
            </Text>
            <Text style={nurturingItem}>
              Day 7: Special offer or consultation invite
            </Text>
            <Text style={nurturingItem}>
              Day 14: Follow-up call if no response
            </Text>
          </Section>

          <Section style={footerSection}>
            <Text style={footerText}>
              Lead captured on: {new Date(submittedAt).toLocaleString()}
            </Text>
            <Text style={footerNote}>
              Add to CRM immediately for automated follow-up
            </Text>
          </Section>

          <Section style={divider} />

          <Text style={footer}>
            Sahara Developers - Building Dreams, Creating Spaces
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

LeadCaptureEmail.PreviewProps = {
  name: "Rahul Verma",
  email: "rahul.verma@example.com",
  phone: "+91 99887 76655",
  leadType: "lead-magnet",
  downloadItem: "Interior Design Trends 2024 Guide",
  submittedAt: new Date().toISOString(),
} as LeadCaptureEmailProps;

export default LeadCaptureEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const logoContainer = {
  padding: "32px",
  textAlign: "center" as const,
};

const headerSection = {
  textAlign: "center" as const,
  marginBottom: "32px",
};

const icon = {
  fontSize: "48px",
  margin: "0 0 16px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "32px",
  margin: "0",
};

const leadInfoSection = {
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  padding: "24px",
  margin: "0 32px 24px",
};

const leadDetail = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#333",
  margin: "8px 0",
};

const link = {
  color: "#2563eb",
  textDecoration: "none",
};

const scoreSection = {
  backgroundColor: "#fef3c7",
  border: "1px solid #fde68a",
  borderRadius: "8px",
  padding: "24px",
  margin: "0 32px 24px",
  textAlign: "center" as const,
};

const scoreTitle = {
  fontSize: "14px",
  color: "#92400e",
  margin: "0 0 8px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
};

const scoreValue = {
  fontSize: "20px",
  fontWeight: "600",
  color: "#d97706",
  margin: "0 0 8px",
};

const scoreDescription = {
  fontSize: "14px",
  color: "#78350f",
  margin: "0",
};

const actionSection = {
  padding: "0 32px",
  marginBottom: "32px",
};

const actionTitle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#333",
  marginBottom: "16px",
  textAlign: "center" as const,
};

const actionButtons = {
  textAlign: "center" as const,
};

const buttonBase = {
  display: "inline-block",
  padding: "12px 24px",
  fontSize: "16px",
  fontWeight: "500",
  textDecoration: "none",
  borderRadius: "6px",
  margin: "0 8px",
};

const primaryButton = {
  ...buttonBase,
  backgroundColor: "#2563eb",
  color: "#ffffff",
};

const secondaryButton = {
  ...buttonBase,
  backgroundColor: "#ffffff",
  color: "#2563eb",
  border: "1px solid #2563eb",
};

const nurturingSection = {
  backgroundColor: "#f0fdf4",
  border: "1px solid #bbf7d0",
  borderRadius: "8px",
  padding: "24px",
  margin: "0 32px 24px",
};

const nurturingTitle = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#166534",
  marginBottom: "12px",
};

const nurturingItem = {
  fontSize: "14px",
  color: "#15803d",
  margin: "6px 0",
  paddingLeft: "20px",
  position: "relative" as const,
};

const footerSection = {
  padding: "24px 32px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "14px",
  color: "#666",
  margin: "8px 0",
};

const footerNote = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#dc2626",
  margin: "8px 0",
};

const divider = {
  borderTop: "1px solid #e5e7eb",
  margin: "32px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
  margin: "0",
};