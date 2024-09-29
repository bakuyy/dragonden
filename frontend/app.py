import streamlit as st
import yfinance as yf
import pandas as pd

# Sample data
data = {
    'ticker': ['ZM', 'SPY', 'AA', 'TSLA', 'NVDA', 'AAPL'],
    'Name': ['Zoom Video', 'SPDR S&P', 'Dow Jones', 'Kosdaq 100', 'US Dollar Japan', 'Ethereum USD'],
    'Price': [492.60, 330.30, 27288.18, 1775.93, 104.93, 344.19],
    'Change': [24.13, 3.33, 140.48, -64.56, 0.29, 3.96],
}

# Create a DataFrame
df = pd.DataFrame(data)

# Actual Dashboard
st.set_page_config(layout="wide")


st.title("Stock Dashboard")

# Sidebar
st.sidebar.header("Your Matches")


# Initialize tick variable in session state if it doesn't exist
if 'stock_selected' not in st.session_state:
    st.session_state.stock_selected = None

# Create buttons for each stock and set the selected stock
for index, row in df.iterrows():
    if st.sidebar.button(f"{row['ticker']} - {row['Name']}"):
        st.session_state.stock_selected = row['ticker']  # Store only the ticker

# Get the selected ticker from the session state
tick = st.session_state.stock_selected


def format_value(value):
    if value is None:  # Check if the value is None
        return "N/A"  # Return a placeholder for missing values
    if not isinstance(value, (int, float)):  # Ensure value is a number
        return "N/A"  # Return a placeholder for invalid types
    suffixes = ["", "K", "M", "B", "T"]
    suffix_index = 0
    while value >= 1000 and suffix_index < len(suffixes) - 1:
        value /= 1000
        suffix_index += 1
    return f"${value:.1f}{suffixes[suffix_index]}"

def safe_format(value, prefix="$", default="N/A"):
    if value is None:  # Check if the value is None
        return default  # Return a placeholder for missing values
    if not isinstance(value, (int, float)):  # Ensure value is a number
        return default  # Return a placeholder for invalid types
    return f"{prefix}{value:.2f}"  # Format with prefix


if tick: 
    stock = yf.Ticker(tick)
    info = stock.info 

    # Get last close price and calculate change and percentage change
    last_close = info.get('currentPrice', 0)
    prev_close = info.get('regularMarketPreviousClose', 0)
    
    if prev_close:
        change = last_close - prev_close
        pct_change = (change / prev_close) * 100
    else:
        change = 0
        pct_change = 0
    
    st.subheader(f"{tick} - {info.get('longName', 'N/A')}")
    
    # Display metrics
    st.metric(label=f"{tick} Price", 
               value=f"${last_close:.2f}", 
               delta=f"{change:.2f} USD ({pct_change:.2f}%)")

    high = info.get('dayHigh', 0)  # High of the day
    low = info.get('dayLow', 0)    # Low of the day
    volume = info.get('volume', 0) # Volume traded

    col1, col2, col3 = st.columns(3)
    col1.metric(label="High", value=f"${high:.2f}")
    col2.metric(label="Low", value=f"${low:.2f}")
    col3.metric(label="Volume", value=f"{volume:,}")

   
    

    history = stock.history(period="1mo", interval="1d")

    chart_data = pd.DataFrame(history["Close"])
    st.line_chart(chart_data)

    col1, col2, col3 = st.columns(3)

    # Display stock information as a dataframe
    country = info.get('country', 'N/A')
    sector = info.get('sector', 'N/A')
    industry = info.get('industry', 'N/A')
    market_cap = info.get('marketCap', 'N/A')
    ent_value = info.get('enterpriseValue', 'N/A')
    employees = info.get('fullTimeEmployees', 'N/A')

    stock_info = [
        ("Stock Info", "Value"),
        ("Country", country),
        ("Sector", sector),
        ("Industry", industry),
        ("Market Cap", format_value(market_cap)),
        ("Enterprise Value", format_value(ent_value)),
        ("Employees", employees)
    ]
    
    df = pd.DataFrame(stock_info[1:], columns=stock_info[0])
    col1.dataframe(df, width=400, hide_index=True)
    
    # Display price information as a dataframe
    current_price = info.get('currentPrice', 'N/A')
    prev_close = info.get('previousClose', 'N/A')
    day_high = info.get('dayHigh', 'N/A')
    day_low = info.get('dayLow', 'N/A')
    ft_week_high = info.get('fiftyTwoWeekHigh', 'N/A')
    ft_week_low = info.get('fiftyTwoWeekLow', 'N/A')
    
    price_info = [
        ("Price Info", "Value"),
        ("Current Price", safe_format(current_price)),
        ("Previous Close", safe_format(prev_close)),
        ("Day High", safe_format(day_high)),
        ("Day Low", safe_format(day_low)),
        ("52 Week High", safe_format(ft_week_high)),
        ("52 Week Low", safe_format(ft_week_low))
    ]
    
    df = pd.DataFrame(price_info[1:], columns=price_info[0])
    col2.dataframe(df, width=400, hide_index=True)

    # Display business metrics as a dataframe
    forward_eps = info.get('forwardEps', 'N/A')
    forward_pe = info.get('forwardPE', 'N/A')
    peg_ratio = info.get('pegRatio', 'N/A')
    dividend_rate = info.get('dividendRate', 'N/A')
    dividend_yield = info.get('dividendYield', 'N/A')
    recommendation = info.get('recommendationKey', 'N/A')
    
    
    biz_metrics = [
        ("Business Metrics", "Value"),
        ("EPS (FWD)", safe_format(forward_eps)),
        ("P/E (FWD)", safe_format(forward_pe)),
        ("PEG Ratio", safe_format(peg_ratio)),
        ("Div Rate (FWD)", safe_format(dividend_rate)),
        ("Div Yield (FWD)", safe_format(dividend_yield, default="N/A")),
        ("Recommendation", recommendation.capitalize())
    ]
    
    df = pd.DataFrame(biz_metrics[1:], columns=biz_metrics[0])
    col3.dataframe(df, width=400, hide_index=True)



