import streamlit as st
import pandas as pd

# Core App Setup
st.set_page_config(page_title="Aero Exotics Dashboard", page_icon="✈️")

# Dashboard Header
st.title("Aero Exotics: Spokane Market Analysis")
st.markdown("### Strategic Presentation Data")

# Metric Row
col1, col2, col3 = st.columns(3)
col1.metric("Insurance Limit", "$3,000,000")
col2.metric("Primary Market", "Spokane / CDA")
col3.metric("Service Niche", "Aero/Marine/Auto")

# Analysis Section
with st.expander("🔍 Top 10 Competitors & URLs", expanded=True):
    competitors = [
        {"Name": "Divine Detailing", "URL": "divinedetailing.com"},
        {"Name": "Detailing Pros Spokane", "URL": "detailingprosnw.com"},
        {"Name": "The Last Detail", "URL": "thelastdetailspokane.com"},
        {"Name": "Spokane Mobile Detailing", "URL": "spokanemobiledetailing.com"},
        {"Name": "Mirror Image CDA", "URL": "mirrorimagecda.com"},
        {"Name": "Inland NW Detailing", "URL": "inlandnwdetail.com"},
        {"Name": "Clean Getaway", "URL": "cleangetaway-spokane.com"},
        {"Name": "Sonic Auto Detail", "URL": "sonicautodetail.com"},
        {"Name": "Apex Mobile Detailing", "URL": "apexdetail.io"},
        {"Name": "Aero Marine Detailing", "URL": "aeromarinedetail.com"}
    ]
    st.table(pd.DataFrame(competitors))

# Business Logic
st.header("Business Strategy & Bottlenecks")
st.warning("**Insurance Constraint:** Services are limited to aircraft under $3M (Piston/Light-Prop).")

tab_a, tab_b = st.tabs(["Improvements & Assets", "Recommendations"])

with tab_a:
    st.write("### Assets")
    st.write("- Specialist Aero Knowledge")
    st.write("- Mobile Agility in Spokane/CDA")
    st.write("### Improvements Needed")
    st.write("- FAA-compliant chemical certification tracking")
    st.write("- Winter-specific hangar partnership agreements")

with tab_b:
    st.info("### Strategic Recommendations")
    st.write("1. **Target Felts Field (SFF):** High density of GA aircraft within $3M limit.")
    st.write("2. **Marine Pivot:** Market high-end ceramic for CDA lake boats during peak summer.")
    st.write("3. **Insurance Scaling:** Plan for $10M coverage to unlock corporate jet market at GEG.")

if st.button("Finalize Launch"):
    st.balloons()
    st.success("Aero Exotics Data Project Ready.")
