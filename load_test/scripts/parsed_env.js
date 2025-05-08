// Parse stringSizes from ENV or use default
export function parseEnvSizes() { // if invalid argument,then default, apply to check if all numbers later
    const raw = __ENV.STRING_SIZES;

    if (!raw) {
      return [3, 5, 10, 15, 30, 50, 75, 100, 500, 750, 1000, 1500, 2000]; // fallback default
    }
  
    return raw
      .split(',')
      .map(s => parseInt(s.trim()))
      .filter(n => !isNaN(n));
  }
  