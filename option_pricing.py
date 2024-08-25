import numpy as np
from scipy.stats import norm

'''
S: Current underlying price
K: Strike price
tau: time till expiry
r: risk free interest rate
sigma: sigma  is the standard deviation of the stock's returns. 
	   This is the square root of the quadratic variation of the stock's log price process, a measure of its volatility.
'''
class black_scholes:
	def __init__(self):
		self.rv = norm()
	def __call__(self, S, K, r, sigma, tau):
		D = np.exp(-r*tau)
		S = float(S)
		K = float(K)
		tau = float(tau) if tau != 0 else 0.00000000001 # very small number
		d_plus =  (np.log(S/K) + (r + (sigma*sigma/2))*tau)/sigma/np.sqrt(tau)
		d_minus = d_plus - sigma*np.sqrt(tau)
		C = S*self.rv.cdf(d_plus) - K*D*self.rv.cdf(d_minus)
		P =  C - S + D*K # K*D*self.rv.cdf(-d_minus) - S*self.rv.cdf(-d_plus)
		#P = P if P > 0 else 0
		return C, P

'''
F: Future price
K: Strike price
tau: time till expiry
r: risk free interest rate
sigma: sigma  is the standard deviation of the stock's returns. 
	   This is the square root of the quadratic variation of the stock's log price process, a measure of its volatility.
'''
class black_76:
	def __init__(self):
		self.rv = norm()
	def __call__(self, F, K, r, sigma, tau):
		D = np.exp(-r*tau)
		F = float(F)
		K = float(K)
		tau = float(tau) if tau != 0 else 0.00000000001 # very small number
		d_plus =  (np.log(F/K) + (r + (sigma*sigma/2))*tau)/sigma/np.sqrt(tau)
		d_minus = d_plus - sigma*np.sqrt(tau)
		C = D*(F*self.rv.cdf(d_plus) - K*D*self.rv.cdf(d_minus))
		P =  C - F + D*K # K*D*self.rv.cdf(-d_minus) - F*self.rv.cdf(-d_plus)
		#P = P if P > 0 else 0
		return C, P

def main():
	bs = black_scholes()
	b76 = black_76()

	r = 0.1 # risk free interest rate
	# prices as evaluated on 29th Mar 2023 for 16th Feb expiry.
	S = 39995.9
	F = 40263 # the Mar future
	K_range = [40200, 41000, 41100, 41200, 41300, 41400, 41500, 41600, 41700, 41800, 41900, 42000]
	sigma = 16.5/100.0 # ATM IV
	tau = 35/365.0
	print('Mar 29th Expiry:')
	print('black_scholes:')
	for K in K_range:
		c, p = bs(S, K, r, sigma, tau)
		print(f'K: {K}: c: {round(c, 2)}, p: {round(p, 2)}')
	print('black_76:')
	for K in K_range:
		c, p = b76(F, K, r, sigma, tau)
		print(f'K: {K}: c: {round(c, 2)}, p: {round(p, 2)}')

	# prices as evaluated on 14th Feb 2023 for 23rd Feb expiry.
	sigma = 15.9/100.0 # ATM IV
	tau = (7*24+3.5)/24.0/365.0
	print('Feb 23rd Expiry:')
	print('black_scholes:')
	for K in K_range:
		c, p = bs(S, K, r, sigma, tau)
		print(f'K: {K}: c: {round(c, 2)}, p: {round(p, 2)}')
	print('black_76:')
	for K in K_range:
		c, p = b76(F, K, r, sigma, tau)
		print(f'K: {K} c: {round(c, 2)}, p: {round(p, 2)}')


if __name__ == '__main__':
	main()