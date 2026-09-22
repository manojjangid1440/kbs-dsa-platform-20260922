import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
} from "react-native";
import { tokens } from "@kbs/tokens";
import { bankDisplay } from "@kbs/domain";
export default function App() {
  const [tab, setTab] = useState<"Home" | "My leads" | "Profile">("Home");
  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={s.content}>
        <View style={s.header}>
          <View style={s.logo}>
            <Text style={s.logoText}>K</Text>
          </View>
          <View>
            <Text style={s.brand}>KBS Partner</Text>
            <Text style={s.muted}>Advisor workspace · Preview</Text>
          </View>
        </View>
        <Text style={s.eyebrow}>YOUR CREDIT CARD BUSINESS</Text>
        <Text style={s.title}>
          {tab === "Home" ? "Every lead.\nA clearer picture." : tab}
        </Text>
        <View style={s.notice}>
          <Text style={s.noticeText}>
            Synthetic foundation preview. No live account, customer data,
            application or payout.
          </Text>
        </View>
        {tab === "Home" && (
          <>
            <View style={s.hero}>
              <Text style={s.heroTitle}>Start with the right information.</Text>
              <Text style={s.heroText}>
                Discover cards, create an operational lead and follow the bank’s
                actual MIS updates.
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => setTab("My leads")}
                style={s.cta}
              >
                <Text style={s.ctaText}>Explore a lead example →</Text>
              </Pressable>
            </View>
            <Text style={s.section}>A shared source of truth</Text>
            {[
              ["Bank MIS", "Stage, decision and activation"],
              ["KBS activity", "Lead creation, links and follow-ups"],
              ["Accounts payment", "Approvals and external payment proof"],
            ].map(([title, desc]) => (
              <View key={title} style={s.row}>
                <Text style={s.rowTitle}>{title}</Text>
                <Text style={s.muted}>{desc}</Text>
              </View>
            ))}
          </>
        )}
        {tab === "My leads" && (
          <View style={s.card}>
            <Text style={s.rowTitle}>Example customer A</Text>
            <Text style={s.muted}>DEMO-001 · HDFC · Synthetic record</Text>
            {[
              ["Stage", "Decisioned Cases"],
              ["Decision", "Approve"],
              ["Activation", "INACTIVE"],
            ].map(([label, value]) => (
              <View key={label} style={s.fact}>
                <Text style={s.muted}>{label}</Text>
                <Text style={s.factValue}>{bankDisplay(value, true)}</Text>
              </View>
            ))}
            <Text style={s.note}>
              An approval does not confirm activation. This example creates no
              payable entitlement.
            </Text>
          </View>
        )}
        {tab === "Profile" && (
          <View style={s.card}>
            <Text style={s.rowTitle}>
              Your profile will appear after sign-in
            </Text>
            <Text style={s.note}>
              OTP, approved identity verification, bank details and Agent Code
              belong to the onboarding workflow. These services are not
              connected in this foundation.
            </Text>
            <Text style={s.note}>
              No permission or reporting relationship can be changed in this
              preview.
            </Text>
          </View>
        )}
        <Text style={s.footer}>
          Bank facts never advance when a link is shared.
        </Text>
      </ScrollView>
      <View style={s.tabs}>
        {(["Home", "My leads", "Profile"] as const).map((t) => (
          <Pressable
            key={t}
            accessibilityRole="tab"
            accessibilityState={{ selected: tab === t }}
            onPress={() => setTab(t)}
            style={s.tab}
          >
            <Text style={[s.tabText, tab === t && s.active]}>{t}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: tokens.colors.canvas, paddingTop: 36 },
  content: { padding: 24, paddingBottom: 40 },
  header: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    marginBottom: 36,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: tokens.colors.ink,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: { fontSize: 24, color: "#b5ece0", fontWeight: "700" },
  brand: { fontSize: 19, fontWeight: "700", color: tokens.colors.ink },
  muted: { fontSize: 12, color: tokens.colors.muted, lineHeight: 20 },
  eyebrow: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    color: tokens.colors.primary,
    marginBottom: 12,
  },
  title: {
    fontSize: 34,
    fontWeight: "600",
    lineHeight: 41,
    color: tokens.colors.ink,
    marginBottom: 20,
  },
  notice: {
    backgroundColor: "#e7f3ef",
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },
  noticeText: { fontSize: 12, lineHeight: 19, color: tokens.colors.primary },
  hero: { backgroundColor: tokens.colors.ink, padding: 24, borderRadius: 20 },
  heroTitle: { fontSize: 24, lineHeight: 31, fontWeight: "600", color: "#fff" },
  heroText: { fontSize: 14, lineHeight: 23, color: "#b8cccc", marginTop: 12 },
  cta: {
    backgroundColor: "#b5ece0",
    padding: 15,
    borderRadius: 10,
    marginTop: 24,
    minHeight: 48,
  },
  ctaText: { color: tokens.colors.ink, fontWeight: "600", fontSize: 14 },
  section: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 28,
    marginBottom: 10,
    color: tokens.colors.ink,
  },
  row: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: tokens.colors.border,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: tokens.colors.ink,
    marginBottom: 4,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: tokens.colors.border,
  },
  fact: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: tokens.colors.border,
  },
  factValue: {
    fontSize: 12,
    fontWeight: "600",
    flexShrink: 1,
    textAlign: "right",
    color: tokens.colors.ink,
  },
  note: {
    fontSize: 13,
    color: tokens.colors.muted,
    lineHeight: 22,
    marginTop: 20,
  },
  footer: {
    fontSize: 11,
    color: tokens.colors.muted,
    marginTop: 28,
    textAlign: "center",
  },
  tabs: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: tokens.colors.border,
    backgroundColor: "#fff",
    paddingBottom: 16,
  },
  tab: { flex: 1, alignItems: "center", padding: 20, minHeight: 56 },
  tabText: { fontSize: 13, color: tokens.colors.muted },
  active: { fontWeight: "700", color: tokens.colors.primary },
});
