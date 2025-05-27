import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy.signal import argrelextrema

def calculate_rsi(data, window=14):
    delta = data.diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=window).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=window).mean()
    rs = gain / loss
    return 100 - (100 / (1 + rs))

def detect_divergence(price, rsi, order=5):
    price_highs = argrelextrema(price.values, np.greater, order=order)[0]
    price_lows = argrelextrema(price.values, np.less, order=order)[0]
    rsi_highs = argrelextrema(rsi.values, np.greater, order=order)[0]
    rsi_lows = argrelextrema(rsi.values, np.less, order=order)[0]

    bullish_divergences = []
    bearish_divergences = []
    hidden_bullish_divergences = []
    hidden_bearish_divergences = []

    for i in range(1, len(price_lows)):
        if price_lows[i] < price_lows[i-1] and rsi.iloc[price_lows[i]] > rsi.iloc[price_lows[i-1]]:
            bullish_divergences.append(price_lows[i])
        elif price_lows[i] > price_lows[i-1] and rsi.iloc[price_lows[i]] < rsi.iloc[price_lows[i-1]]:
            hidden_bullish_divergences.append(price_lows[i])

    for i in range(1, len(price_highs)):
        if price_highs[i] > price_highs[i-1] and rsi.iloc[price_highs[i]] < rsi.iloc[price_highs[i-1]]:
            bearish_divergences.append(price_highs[i])
        elif price_highs[i] < price_highs[i-1] and rsi.iloc[price_highs[i]] > rsi.iloc[price_highs[i-1]]:
            hidden_bearish_divergences.append(price_highs[i])

    return bullish_divergences, bearish_divergences, hidden_bullish_divergences, hidden_bearish_divergences

def plot_divergences(price, rsi, bullish, bearish, hidden_bullish, hidden_bearish):
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(15, 10), sharex=True)
    
    ax1.plot(price.index, price.values)
    ax1.set_title('Price Chart with Divergences')
    ax1.set_ylabel('Price')
    
    ax2.plot(rsi.index, rsi.values)
    ax2.set_title('RSI Chart')
    ax2.set_ylabel('RSI')
    ax2.set_ylim(0, 100)
    ax2.axhline(y=30, color='r', linestyle='--')
    ax2.axhline(y=70, color='r', linestyle='--')
    
    for idx in bullish:
        ax1.plot(price.index[idx], price.iloc[idx], 'go', markersize=10)
        ax2.plot(rsi.index[idx], rsi.iloc[idx], 'go', markersize=10)
    
    for idx in bearish:
        ax1.plot(price.index[idx], price.iloc[idx], 'ro', markersize=10)
        ax2.plot(rsi.index[idx], rsi.iloc[idx], 'ro', markersize=10)
    
    for idx in hidden_bullish:
        ax1.plot(price.index[idx], price.iloc[idx], 'bo', markersize=10)
        ax2.plot(rsi.index[idx], rsi.iloc[idx], 'bo', markersize=10)
    
    for idx in hidden_bearish:
        ax1.plot(price.index[idx], price.iloc[idx], 'yo', markersize=10)
        ax2.plot(rsi.index[idx], rsi.iloc[idx], 'yo', markersize=10)
    
    plt.tight_layout()
    plt.show()

# Example usage
# Assuming you have a DataFrame 'df' with 'Date' and 'Close' columns
# df = pd.read_csv('your_price_data.csv')
# df['Date'] = pd.to_datetime(df['Date'])
# df.set_index('Date', inplace=True)

# Generate sample data for demonstration
np.random.seed(42)
dates = pd.date_range(start='2020-01-01', end='2021-12-31', freq='D')
close_prices = np.random.randn(len(dates)).cumsum() + 100
df = pd.DataFrame({'Close': close_prices}, index=dates)

df['RSI'] = calculate_rsi(df['Close'])
bullish, bearish, hidden_bullish, hidden_bearish = detect_divergence(df['Close'], df['RSI'])
plot_divergences(df['Close'], df['RSI'], bullish, bearish, hidden_bullish, hidden_bearish)
