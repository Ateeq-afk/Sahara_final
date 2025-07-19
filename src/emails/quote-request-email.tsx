import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface QuoteRequestEmailProps {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  location: string;
  requirements: string;
  referralSource?: string;
  submittedAt: string;
}

export const QuoteRequestEmail = ({
  name,
  email,
  phone,
  projectType,
  budget,
  timeline,
  location,
  requirements,
  referralSource,
  submittedAt,
}: QuoteRequestEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New quote request from {name} - {projectType}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/logo.png`}
              width="150"
              height="50"
              alt="Sahara Developers"
            />
          </Section>

          <Heading style={h1}>New Quote Request</Heading>
          <Text style={subtitle}>{projectType} Project</Text>
          
          <Section style={highlightSection}>
            <Row>
              <Column style={highlightColumn}>
                <Text style={highlightLabel}>Budget</Text>
                <Text style={highlightValue}>{budget}</Text>
              </Column>
              <Column style={highlightColumn}>
                <Text style={highlightLabel}>Timeline</Text>
                <Text style={highlightValue}>{timeline}</Text>
              </Column>
            </Row>
          </Section>

          <Section style={detailsSection}>
            <Text style={sectionTitle}>Client Information</Text>
            <Row style={detailRow}>
              <Column style={labelColumn}>
                <Text style={label}>Name:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{name}</Text>
              </Column>
            </Row>
            <Row style={detailRow}>
              <Column style={labelColumn}>
                <Text style={label}>Email:</Text>
              </Column>
              <Column style={valueColumn}>
                <Link href={`mailto:${email}`} style={link}>
                  {email}
                </Link>
              </Column>
            </Row>
            <Row style={detailRow}>
              <Column style={labelColumn}>
                <Text style={label}>Phone:</Text>
              </Column>
              <Column style={valueColumn}>
                <Link href={`tel:${phone}`} style={link}>
                  {phone}
                </Link>
              </Column>
            </Row>
            <Row style={detailRow}>
              <Column style={labelColumn}>
                <Text style={label}>Location:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{location}</Text>
              </Column>
            </Row>
            {referralSource && (
              <Row style={detailRow}>
                <Column style={labelColumn}>
                  <Text style={label}>Referral:</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>{referralSource}</Text>
                </Column>
              </Row>
            )}
          </Section>

          <Section style={requirementsSection}>
            <Text style={sectionTitle}>Project Requirements</Text>
            <Text style={requirementsStyle}>{requirements}</Text>
          </Section>

          <Section style={actionSection}>
            <Text style={actionTitle}>Recommended Actions</Text>
            <Text style={actionItem}>1. Review project requirements and budget</Text>
            <Text style={actionItem}>2. Schedule initial consultation call</Text>
            <Text style={actionItem}>3. Prepare preliminary quote estimate</Text>
            <Text style={actionItem}>4. Send follow-up email within 24 hours</Text>
          </Section>

          <Section style={footerSection}>
            <Text style={footerText}>
              Submitted on: {new Date(submittedAt).toLocaleString()}
            </Text>
            <Text style={urgencyText}>
              {timeline === "Immediate (Within 1 month)" && "⚡ This is an urgent request - prioritize follow-up"}
              {timeline === "Short-term (1-3 months)" && "📅 Client looking to start soon"}
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

QuoteRequestEmail.PreviewProps = {
  name: "Priya Sharma",
  email: "priya.sharma@example.com",
  phone: "+91 98765 43210",
  projectType: "Residential Construction",
  budget: "₹50-75 Lakhs",
  timeline: "Short-term (1-3 months)",
  location: "HSR Layout, Bangalore",
  requirements: "Looking to build a 3-storey residential building on a 30x40 site. Need complete construction services including architectural design, structural work, and basic interior finishing. Prefer modern design with good ventilation and natural lighting.",
  referralSource: "Previous Client",
  submittedAt: new Date().toISOString(),
} as QuoteRequestEmailProps;

export default QuoteRequestEmail;

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

const h1 = {
  color: "#333",
  fontSize: "28px",
  fontWeight: "600",
  lineHeight: "40px",
  margin: "0 0 8px",
  textAlign: "center" as const,
};

const subtitle = {
  color: "#666",
  fontSize: "18px",
  textAlign: "center" as const,
  margin: "0 0 32px",
};

const highlightSection = {
  backgroundColor: "#f0fdf4",
  border: "1px solid #bbf7d0",
  borderRadius: "8px",
  padding: "24px",
  margin: "0 32px 24px",
};

const highlightColumn = {
  width: "50%",
  textAlign: "center" as const,
};

const highlightLabel = {
  fontSize: "14px",
  color: "#666",
  margin: "0 0 8px",
};

const highlightValue = {
  fontSize: "20px",
  fontWeight: "600",
  color: "#16a34a",
  margin: "0",
};

const detailsSection = {
  padding: "0 32px",
  marginBottom: "24px",
};

const sectionTitle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#333",
  marginBottom: "16px",
  paddingBottom: "8px",
  borderBottom: "2px solid #e5e7eb",
};

const detailRow = {
  marginBottom: "12px",
};

const labelColumn = {
  width: "120px",
  paddingRight: "16px",
};

const valueColumn = {
  width: "auto",
};

const label = {
  fontSize: "14px",
  fontWeight: "500",
  color: "#666",
  margin: "0",
};

const value = {
  fontSize: "16px",
  color: "#333",
  margin: "0",
};

const link = {
  color: "#2563eb",
  textDecoration: "none",
};

const requirementsSection = {
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  padding: "24px",
  margin: "0 32px 24px",
};

const requirementsStyle = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#333",
  whiteSpace: "pre-wrap" as const,
  margin: "0",
};

const actionSection = {
  backgroundColor: "#fef3c7",
  border: "1px solid #fde68a",
  borderRadius: "8px",
  padding: "24px",
  margin: "0 32px 24px",
};

const actionTitle = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#92400e",
  marginBottom: "12px",
};

const actionItem = {
  fontSize: "14px",
  color: "#78350f",
  margin: "6px 0",
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

const urgencyText = {
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