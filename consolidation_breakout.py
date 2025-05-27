import yfinance as yf
import pandas as pd

# List of NIFTY 50 and NIFTY 200 stocks (you may need to update this list periodically)
nifty_50_symbols = [
    "RELIANCE.NS", "TCS.NS", "INFY.NS", "HDFCBANK.NS", "ICICIBANK.NS", "HINDUNILVR.NS", "SBIN.NS", "BHARTIARTL.NS", 
    "KOTAKBANK.NS", "LT.NS", "AXISBANK.NS", "ASIANPAINT.NS", "BAJFINANCE.NS", "HCLTECH.NS", "MARUTI.NS", "TITAN.NS",
    "SUNPHARMA.NS", "TATASTEEL.NS", "TECHM.NS", "WIPRO.NS", "ULTRACEMCO.NS", "ONGC.NS", "POWERGRID.NS", "NTPC.NS",
    "COALINDIA.NS", "JSWSTEEL.NS", "NESTLEIND.NS", "HDFCLIFE.NS", "INDUSINDBK.NS", "BAJAJFINSV.NS", "DRREDDY.NS",
    "GRASIM.NS", "CIPLA.NS", "SBILIFE.NS", "HINDALCO.NS", "TATAMOTORS.NS", "ADANIPORTS.NS", "DIVISLAB.NS", "UPL.NS",
    "EICHERMOT.NS", "BRITANNIA.NS", "BPCL.NS", "HEROMOTOCO.NS", "IOC.NS", "SHREECEM.NS", "M&M.NS", "BAJAJ-AUTO.NS",
    "VEDL.NS", "GAIL.NS", "AMBUJACEM.NS"
]

nifty_200_symbols = nifty_50_symbols + ["DMART.NS", "ABB.NS", "CONCOR.NS", "SRF.NS", "PIDILITIND.NS"]  # Add more symbols

# Define the time period to fetch historical data
period = "30d"  # Fetch last 30 days of data
# Fetch last 21 days of data to calculate 20-day high/low
data = yf.download(nifty_200_symbols, period="21d", interval="1d")

# Extract necessary columns
df = data[['Close', 'High', 'Low']].copy()

# Calculate 20-day high & low (excluding the current day)
df['20-Day High'] = df['High'].rolling(window=20).max().shift(1)
df['20-Day Low'] = df['Low'].rolling(window=20).min().shift(1)

# Get previous day's closing price
df['Prev Close'] = df['Close'].shift(1)

# Get the latest available data (drop NaN values)
latest_df = df.iloc[-1].reset_index()
latest_df.columns = ['Stock', 'Close', 'High', 'Low', '20-Day High', '20-Day Low', 'Prev Close']

# Filtering bullish & bearish stocks
bullish_stocks = latest_df[latest_df['Prev Close'] > latest_df['20-Day High']].copy()
bearish_stocks = latest_df[latest_df['Prev Close'] < latest_df['20-Day Low']].copy()

# Add signal column
bullish_stocks["Signal"] = "Bullish"
bearish_stocks["Signal"] = "Bearish"

# Combine results
filtered_stocks = pd.concat([bullish_stocks, bearish_stocks])

# Display final filtered stocks
print(filtered_stocks)

