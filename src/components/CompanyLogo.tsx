import React, { useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';

interface CompanyLogoProps {
  symbol: string;
  companyName?: string;
  size?: string;
  className?: string;
}

// Logo.dev API configuration
const LOGO_DEV_API_KEY = 'pk_Mb-IMkodSwqyKsbHka0e3Q';
const LOGO_DEV_BASE_URL = 'https://img.logo.dev';

// Domain mapping for better logo fetching
const domainMap: Record<string, string> = {
  // Major tech companies
  'AAPL': 'apple.com',
  'MSFT': 'microsoft.com',
  'GOOGL': 'google.com',
  'AMZN': 'amazon.com',
  'TSLA': 'tesla.com',
  'NVDA': 'nvidia.com',
  'META': 'meta.com',
  'NFLX': 'netflix.com',
  'ADBE': 'adobe.com',
  'CRM': 'salesforce.com',
  'ORCL': 'oracle.com',
  'CSCO': 'cisco.com',
  'IBM': 'ibm.com',
  'QCOM': 'qualcomm.com',
  'TXN': 'ti.com',
  'AMD': 'amd.com',
  'AVGO': 'broadcom.com',
  'INTC': 'intel.com',
  'SHOP': 'shopify.com',
  'ZM': 'zoom.us',
  'SPOT': 'spotify.com',
  'SNAP': 'snap.com',
  'PINS': 'pinterest.com',
  'UBER': 'uber.com',
  'LYFT': 'lyft.com',
  'ABNB': 'airbnb.com',
  'DASH': 'doordash.com',
  'COIN': 'coinbase.com',
  'ROKU': 'roku.com',
  'CRWD': 'crowdstrike.com',
  'ZS': 'zscaler.com',
  'OKTA': 'okta.com',
  'PLTR': 'palantir.com',
  'PATH': 'uipath.com',
  'RBLX': 'roblox.com',
  'HOOD': 'robinhood.com',
  'LCID': 'lucidmotors.com',
  'RIVN': 'rivian.com',
  'NIO': 'nio.com',
  'XPEV': 'xpeng.com',
  'LI': 'li-auto.com',
  'BIDU': 'baidu.com',
  'JD': 'jd.com',
  'PDD': 'pinduoduo.com',
  'BABA': 'alibaba.com',
  'TCEHY': 'tencent.com',
  'NTES': 'netease.com',
  'ASML': 'asml.com',
  'SE': 'sea.com',
  'MELI': 'mercadolibre.com',
  'AFRM': 'affirm.com',
  'UPST': 'upstart.com',
  'SOFI': 'sofi.com',
  'CHWY': 'chewy.com',
  'ETSY': 'etsy.com',
  'FTCH': 'farfetch.com',
  'W': 'wayfair.com',
  'PTON': 'onepeloton.com',
  'BYND': 'beyondmeat.com',
  'OATLY': 'oatly.com',
  
  // Financial companies
  'JPM': 'jpmorganchase.com',
  'BAC': 'bankofamerica.com',
  'WFC': 'wellsfargo.com',
  'GS': 'goldmansachs.com',
  'MS': 'morganstanley.com',
  'V': 'visa.com',
  'MA': 'mastercard.com',
  'PYPL': 'paypal.com',
  'SQ': 'square.com',
  'BRK.A': 'berkshirehathaway.com',
  'UNH': 'unitedhealthgroup.com',
  'JNJ': 'jnj.com',
  'PFE': 'pfizer.com',
  'ABBV': 'abbvie.com',
  'MRK': 'merck.com',
  'TMO': 'thermofisher.com',
  'ABT': 'abbott.com',
  'DHR': 'danaher.com',
  'LLY': 'lilly.com',
  'BMY': 'bms.com',
  'AMGN': 'amgen.com',
  'GILD': 'gilead.com',
  'REGN': 'regeneron.com',
  'ISRG': 'intuitivesurgical.com',
  'MDLZ': 'mondelezinternational.com',
  'ADP': 'adp.com',
  'RTX': 'rtx.com',
  'LOW': 'lowes.com',
  'UPS': 'ups.com',
  'SPGI': 'spglobal.com',
  'INTU': 'intuit.com',
  'BLK': 'blackrock.com',
  'SCHW': 'schwab.com',
  'AXP': 'americanexpress.com',
  'CAT': 'cat.com',
  'DE': 'deere.com',
  'MMC': 'marshmclennan.com',
  
  // Consumer companies
  'PG': 'pg.com',
  'KO': 'coca-cola.com',
  'PEP': 'pepsico.com',
  'HD': 'homedepot.com',
  'COST': 'costco.com',
  'WMT': 'walmart.com',
  'DIS': 'thewaltdisneycompany.com',
  'CMCSA': 'comcast.com',
  'VZ': 'verizon.com',
  'T': 'att.com',
  'TMUS': 't-mobile.com',
  'CHTR': 'charter.com',
  'CME': 'cmegroup.com',
  'ICE': 'theice.com',
  'MCO': 'moodys.com',
  'FIS': 'fisglobal.com',
  'FISV': 'fiserv.com',
  'GPN': 'globalpayments.com',
  'JKHY': 'jackhenry.com',
  'PAYX': 'paychex.com',
  'WU': 'westernunion.com',
  'COF': 'capitalone.com',
  'USB': 'usbank.com',
  'PNC': 'pnc.com',
  'TFC': 'truist.com',
  'KEY': 'key.com',
  'HBAN': 'huntington.com',
  'RF': 'regions.com',
  'CFG': 'citizensbank.com',
  'MTB': 'mtb.com',
  'ZION': 'zionbank.com',
  'CMA': 'comerica.com',
  'FITB': '53.com',
  'BBT': 'bbt.com',
  'STI': 'suntrust.com',
  'NTRS': 'northerntrust.com',
  'STT': 'statestreet.com',
  'BK': 'bankofnewyorkmellon.com',
  'C': 'citi.com',
  'DFS': 'discover.com',
  'SYF': 'synchrony.com',
  'ALLY': 'ally.com',
  'AFL': 'aflac.com',
  'MET': 'metlife.com',
  'PRU': 'prudential.com',
  'LNC': 'lincolnfinancial.com',
  'PFG': 'principal.com',
  'HIG': 'thehartford.com',
  'TRV': 'travelers.com',
  'ALL': 'allstate.com',
  'PGR': 'progressive.com',
  'CB': 'chubb.com',
  'ACE': 'acegroup.com',
  'XL': 'xlgroup.com',
  'RE': 'everestregroup.com',
  'WRB': 'wrb.com',
  'AJG': 'ajg.com',
  'WLTW': 'willistowerswatson.com',
  'AON': 'aon.com',
  'BRO': 'brownandbrown.com',
  'RLI': 'rlicorp.com',
  'EVR': 'evercore.com',
  'LAZ': 'lazard.com',
  'PIPR': 'piper.com',
  'SF': 'stifel.com',
  'RJF': 'raymondjames.com',
  'AMTD': 'tdameritrade.com',
  'ETFC': 'etrade.com',
  'IBKR': 'interactivebrokers.com',
  'LPLA': 'lpl.com',
  'JEF': 'jefferies.com',
  'COWN': 'cowen.com',
  'HLI': 'houlihanlokey.com',
  'MC': 'moelis.com',
  'PJT': 'pjpartners.com',
  'FIG': 'fortress.com',
  'APO': 'apollo.com',
  'KKR': 'kkr.com',
  'BX': 'blackstone.com',
  'CG': 'carlyle.com',
  'ARES': 'aresmgmt.com',
  'OAK': 'oaktree.com'
};

const getDomainFromSymbol = (symbol: string, companyName?: string): string => {
  // First check the domain map
  if (domainMap[symbol]) {
    return domainMap[symbol];
  }
  
  // If not in map, try to extract from company name
  if (companyName) {
    const name = companyName.toLowerCase();
    
    // Common patterns
    if (name.includes('apple')) return 'apple.com';
    if (name.includes('microsoft')) return 'microsoft.com';
    if (name.includes('google') || name.includes('alphabet')) return 'google.com';
    if (name.includes('amazon')) return 'amazon.com';
    if (name.includes('tesla')) return 'tesla.com';
    if (name.includes('nvidia')) return 'nvidia.com';
    if (name.includes('meta') || name.includes('facebook')) return 'meta.com';
    if (name.includes('netflix')) return 'netflix.com';
    if (name.includes('adobe')) return 'adobe.com';
    if (name.includes('salesforce')) return 'salesforce.com';
    if (name.includes('oracle')) return 'oracle.com';
    if (name.includes('cisco')) return 'cisco.com';
    if (name.includes('ibm')) return 'ibm.com';
    if (name.includes('qualcomm')) return 'qualcomm.com';
    if (name.includes('intel')) return 'intel.com';
    if (name.includes('amd')) return 'amd.com';
    if (name.includes('broadcom')) return 'broadcom.com';
    if (name.includes('shopify')) return 'shopify.com';
    if (name.includes('zoom')) return 'zoom.us';
    if (name.includes('spotify')) return 'spotify.com';
    if (name.includes('snap')) return 'snap.com';
    if (name.includes('pinterest')) return 'pinterest.com';
    if (name.includes('uber')) return 'uber.com';
    if (name.includes('lyft')) return 'lyft.com';
    if (name.includes('airbnb')) return 'airbnb.com';
    if (name.includes('doordash')) return 'doordash.com';
    if (name.includes('coinbase')) return 'coinbase.com';
    if (name.includes('roku')) return 'roku.com';
    if (name.includes('crowdstrike')) return 'crowdstrike.com';
    if (name.includes('zscaler')) return 'zscaler.com';
    if (name.includes('okta')) return 'okta.com';
    if (name.includes('palantir')) return 'palantir.com';
    if (name.includes('uipath')) return 'uipath.com';
    if (name.includes('roblox')) return 'roblox.com';
    if (name.includes('robinhood')) return 'robinhood.com';
    if (name.includes('lucid')) return 'lucidmotors.com';
    if (name.includes('rivian')) return 'rivian.com';
    if (name.includes('nio')) return 'nio.com';
    if (name.includes('xpeng')) return 'xpeng.com';
    if (name.includes('li auto')) return 'li-auto.com';
    if (name.includes('baidu')) return 'baidu.com';
    if (name.includes('jd.com') || name.includes('jd ')) return 'jd.com';
    if (name.includes('pinduoduo')) return 'pinduoduo.com';
    if (name.includes('alibaba')) return 'alibaba.com';
    if (name.includes('tencent')) return 'tencent.com';
    if (name.includes('netease')) return 'netease.com';
    if (name.includes('asml')) return 'asml.com';
    if (name.includes('sea')) return 'sea.com';
    if (name.includes('mercadolibre')) return 'mercadolibre.com';
    if (name.includes('affirm')) return 'affirm.com';
    if (name.includes('upstart')) return 'upstart.com';
    if (name.includes('sofi')) return 'sofi.com';
    if (name.includes('chewy')) return 'chewy.com';
    if (name.includes('etsy')) return 'etsy.com';
    if (name.includes('farfetch')) return 'farfetch.com';
    if (name.includes('wayfair')) return 'wayfair.com';
    if (name.includes('peloton')) return 'onepeloton.com';
    if (name.includes('beyond meat')) return 'beyondmeat.com';
    if (name.includes('oatly')) return 'oatly.com';
  }
  
  // Fallback: try to construct a domain from the symbol
  return `${symbol.toLowerCase()}.com`;
};

const getLogoUrl = (symbol: string, companyName?: string): string => {
  const domain = getDomainFromSymbol(symbol, companyName);
  return `${LOGO_DEV_BASE_URL}/${domain}?token=${LOGO_DEV_API_KEY}`;
};

const getFallbackUrl = (symbol: string, companyName?: string): string => {
  // UI Avatars fallback with company name
  const name = companyName || symbol;
  const encodedName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=fff&size=128&font-size=0.4&length=2`;
};

export const CompanyLogoWithFallback: React.FC<CompanyLogoProps> = ({
  symbol,
  companyName,
  size = "w-8 h-8",
  className = ""
}) => {
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchLogo = async () => {
      setIsLoading(true);
      setHasError(false);
      
      try {
        const primaryUrl = getLogoUrl(symbol, companyName);
        // For logo.dev, we can directly use the URL as it returns an image
        setLogoUrl(primaryUrl);
      } catch (error) {
        console.warn(`Failed to fetch logo for ${symbol}:`, error);
        const fallbackUrl = getFallbackUrl(symbol, companyName);
        setLogoUrl(fallbackUrl);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogo();
  }, [symbol, companyName]);

  if (isLoading) {
    return (
      <div className={`${size} bg-secondary logo-rounded flex items-center justify-center animate-pulse ${className}`}>
        <Building2 className="w-4 h-4 text-muted-foreground" />
      </div>
    );
  }

  if (hasError || !logoUrl) {
    return (
      <div className={`${size} bg-secondary logo-rounded flex items-center justify-center ${className}`}>
        <Building2 className="w-4 h-4 text-muted-foreground" />
      </div>
    );
  }

  return (
    <img
      src={logoUrl}
      alt={`${companyName || symbol} logo`}
      className={`${size} logo-rounded object-cover ${className}`}
      onError={() => {
        setHasError(true);
        setLogoUrl(getFallbackUrl(symbol, companyName));
      }}
    />
  );
}; 