import streamlit as st
import pandas as pd

# 1. PAGE CONFIGURATION
st.set_page_config(
    page_title="Aero Exotics | Business Intelligence",
    page_icon="✈️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# 2. THEME & CUSTOM CSS
st.markdown("""
    <style>
    .main { background-color: #f8fafc; }
    .stMetric { 
        background-color: #ffffff; 
        padding: 20px; 
        border-radius: 12px; 
        border: 1px solid #e2e8f0;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .stAlert { border-radius: 12px; }
    h1, h2, h3 { color: #0f172a; font-family: 'Helvetica Neue', sans-serif; }
    </style>
    """, unsafe_allow_index=True)

# 3. SIDEBAR NAVIGATION
with st.sidebar:
    st.image("https://img.icons8.com/ios-filled/100/1e293b/airplane-take-off.png", width=80)
    st.title("Aero Exotics")
    st.markdown("📍 **HQ:** Spokane, WA")
    st.divider()
    st.subheader("🛡️ Insurance Profile")
    st.error("**Current Cap: $3,000,000**")
    st.caption("Focus: Piston-Prop & Light Marine")

# 4. MAIN HEADER
st.title("🚀 Aero Exotics: Strategic Launch Dashboard")
st.markdown("### Market Analysis, Competitor Benchmarking, and Risk Mitigation")

# 5. HIGH-LEVEL KPI ROW
m1, m2, m3, m4 = st.columns(4)
with m1:
    st.metric("Total Competitors", "10", "Spokane/CDA")
with m2:
    st.metric("Addressable Airports", "4", "Regional GA")
with m3:
    st.metric("Market Gap", "High", "Aero Specialization")
with m4:
    st.metric("Risk Profile", "Low", "$3M Tier")

# 6. DATA TABS
tab1, tab2, tab3, tab4 = st.tabs([
    "🔍 Competitor Matrix", 
    "⚖️ Asset & Insurance Logic", 
    "🚧 Bottlenecks & SWOT", 
    "📈 Growth Roadmap"
])

with tab1:
    st.header("Spokane Corridor Competitive Landscape")
    competitor_data = [
        {"Company": "Divine Detailing", "URL": "divinedetailing.com", "Focus": "Auto/Marine", "Threat": "High"},
        {"Company": "The Last Detail", "URL": "thelastdetailspokane.com", "Focus": "Exotic Auto", "Threat": "Medium"},
        {"Company": "Mirror Image CDA", "URL": "mirrorimagecda.com", "Focus": "Marine Specialist", "Threat": "High"},
        {"Company": "Aero Marine Detail", "URL": "aeromarinedetail.com", "Focus": "Direct Niche", "Threat": "Critical"},
        {"Company": "Inland NW Detailing", "URL": "inlandnwdetail.com", "Focus": "Ceramic Coating", "Threat": "Low"},
        {"Company": "Apex Mobile", "URL": "apexdetail.io", "Focus": "Mobile Auto", "Threat": "Medium"},
        {"Company": "Detailing Pros", "URL": "detailingprosnw.com", "Focus": "Generalist", "Threat": "Low"},
        {"Company": "Clean Getaway", "URL": "cleangetaway-spokane.com", "Focus": "Commercial Fleet", "Threat": "Low"},
        {"Company": "Sonic Auto Detail", "URL": "sonicautodetail.com", "Focus": "Premium Auto", "Threat": "Medium"},
        {"Company": "Spokane Mobile", "URL": "spokanemobiledetailing.com", "Focus": "Mobile Auto", "Threat": "Medium"}
    ]
    st.dataframe(pd.DataFrame(competitor_data), use_container_width=True, hide_index=True)

with tab2:
    st.header("Asset Capability vs. Insurance Limit")
    st.warning("All operations strictly limited to assets with a hull value under **$3,000,000**.")
    col_a, col_b = st.columns(2)
    with col_a:
        st.subheader("✅ Green Zone (Under $3M)")
        st.write("- Cessna 172/182, Cirrus SR22, Beechcraft Bonanza")
        st.write("- All standard consumer exotics (Ferrari, Porsche)")
        st.write("- Lake CDA wake boats and pontoons")
    with col_b:
        st.subheader("❌ Red Zone (Over $3M)")
        st.write("- Phenom 100/300, Citation CJ Jets")
        st.write("- Pilatus PC-12, King Air 350")
        st.write("- Large Yachts > 50 feet")

with tab3:
    st.header("SWOT Analysis")
    c1, c2 = st.columns(2)
    with c1:
        st.subheader("⚠️ Bottlenecks")
        st.write("- $3M Insurance Ceiling")
        st.write("- Spokane Winter Seasonality")
    with c2:
        st.subheader("🌟 Assets")
        st.write("- Mobile Specialization")
        st.write("- FAA-Compliant Chemical Training")

with tab4:
    st.header("Launch Roadmap")
    st.markdown("1. **Q2:** Target Felts Field (SFF) Piston Fleet.")
    st.markdown("2. **Q3:** CDA Lake Marine push.")
    st.markdown("3. **Year 2:** Upgrade insurance to $10M for Corporate Jets.")

st.divider()
st.caption("Aero Exotics BI Dashboard | Spokane, WA")
