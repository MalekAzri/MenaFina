TICKERS = {

    "ETF_Global":     ["VT","VOO","SPY","QQQ","VTI"],
    "Tech_US":        ["AAPL","MSFT","GOOGL","AMZN","META","NVDA"],
    "Finance":        ["JPM","BAC","WFC","V","MA"],
    "Healthcare":     ["JNJ","PFE","MRNA","XLV"],
    "Energy":         ["XOM","CVX","XLE"],
    "REIT":           ["VNQ","O","SPG"],
    "Consumer":       ["KO","PG","MCD","PEP","WMT"],
    "Industry":       ["CAT","RTX","NOC","BA"],
    "Emerging":       ["VWO","EEM","EWJ","EWZ","IEUR"],
    "Commodities":    ["GLD","SLV","DBC","CPER"],
    "Crypto":         ["BTC-USD","ETH-USD","SOL-USD"],  
    "Bonds":          ["BND","TLT","LQD","IEF","SHY"], 

}

# transformer en liste à plat
def get_all_tickers():
    out=[]
    for v in TICKERS.values(): out.extend(v)
    return out
