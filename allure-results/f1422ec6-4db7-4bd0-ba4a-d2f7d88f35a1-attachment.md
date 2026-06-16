# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: UI\05-negativeScenarios.spec.ts >> TS-10 Session Access Scenarios >> Login Wrong Credentials
- Location: tests\UI\05-negativeScenarios.spec.ts:14:9

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('body')
Timeout: 5000ms
- Expected substring  -   1
+ Received string     + 131

- The username and password could not be verified.
+
+ 		
+ 			
+ 				
+ 				
+ 					
+
+
+
+
+   
+   
+   Experience the difference
+
+
+   
+
+
+
+   Solutions
+   About Us
+   Services
+   Products
+   Locations
+   Admin Page
+   
+
+   
+
+
+
+   home
+   about
+   contact
+
+
+ 				
+ 			
+ 			
+ 				
+ 					
+ 						
+ 						
+ 							
+
+
+ Welcome Auto Bot1713462674
+
+ Account Services
+
+
+
+
+   Open New Account
+   Accounts Overview
+   Transfer Funds
+   Bill Pay
+   Find Transactions
+   Update Contact Info
+   Request Loan
+   Log Out
+
+ 						
+ 					
+ 				
+ 				
+ 					
+
+
+
+ 	
+ 		
+ 			Accounts Overview
+ 		
+ 		
+ 			
+ 				
+ 					Account
+ 					Balance*
+ 					Available Amount
+ 				
+ 			
+ 			29217$225.50$225.5030216$290.00$290.00Total$515.50 
+ 			
+ 				
+ 					*Balance includes deposits that may be subject to holds
+ 				
+ 			
+ 		
+ 	
+
+ 	
+ 		
+ 			Error!
+ 		
+ 		
+ 			An internal error has occurred and has been logged.
+ 		
+ 	
+
+
+
+
+ 				
+ 			
+ 		
+ 		
+
+
+
+   
+     
+       Home| 
+       About Us| 
+       Services| 
+       Products| 
+       Locations| 
+       Forum| 
+       Site Map| 
+       Contact Us
+     
+     © Parasoft. All rights reserved.
+     
+       Visit us at:
+       www.parasoft.com
+     
+   
+
+ 	
+
+

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('body')
    2 × locator resolved to <body>…</body>
      - unexpected value "
		
			
				
				
					




  
  
  Experience the difference


  



  Solutions
  About Us
  Services
  Products
  Locations
  Admin Page
  

  



  home
  about
  contact


				
			
			
				
					
						
						
							


Welcome Auto Bot1713462674

Account Services




  Open New Account
  Accounts Overview
  Transfer Funds
  Bill Pay
  Find Transactions
  Update Contact Info
  Request Loan
  Log Out

						
					
				
				
					



	
		
			Accounts Overview
		
		
			
				
					Account
					Balance*
					Available Amount
				
			
			
			
				
					*Balance includes deposits that may be subject to holds
				
			
		
	

	
		
			Error!
		
		
			An internal error has occurred and has been logged.
		
	




				
			
		
		



  
    
      Home| 
      About Us| 
      Services| 
      Products| 
      Locations| 
      Forum| 
      Site Map| 
      Contact Us
    
    © Parasoft. All rights reserved.
    
      Visit us at:
      www.parasoft.com
    
  

	

"
    8 × locator resolved to <body>…</body>
      - unexpected value "
		
			
				
				
					




  
  
  Experience the difference


  



  Solutions
  About Us
  Services
  Products
  Locations
  Admin Page
  

  



  home
  about
  contact


				
			
			
				
					
						
						
							


Welcome Auto Bot1713462674

Account Services




  Open New Account
  Accounts Overview
  Transfer Funds
  Bill Pay
  Find Transactions
  Update Contact Info
  Request Loan
  Log Out

						
					
				
				
					



	
		
			Accounts Overview
		
		
			
				
					Account
					Balance*
					Available Amount
				
			
			29217$225.50$225.5030216$290.00$290.00Total$515.50 
			
				
					*Balance includes deposits that may be subject to holds
				
			
		
	

	
		
			Error!
		
		
			An internal error has occurred and has been logged.
		
	




				
			
		
		



  
    
      Home| 
      About Us| 
      Services| 
      Products| 
      Locations| 
      Forum| 
      Site Map| 
      Contact Us
    
    © Parasoft. All rights reserved.
    
      Visit us at:
      www.parasoft.com
    
  

	

"

```

```yaml
- link:
  - /url: admin.htm
  - img
- link "ParaBank":
  - /url: index.htm
  - img "ParaBank"
- paragraph: Experience the difference
- list:
  - listitem: Solutions
  - listitem:
    - link "About Us":
      - /url: about.htm
  - listitem:
    - link "Services":
      - /url: services.htm
  - listitem:
    - link "Products":
      - /url: http://www.parasoft.com/jsp/products.jsp
  - listitem:
    - link "Locations":
      - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
  - listitem:
    - link "Admin Page":
      - /url: admin.htm
- list:
  - listitem:
    - link "home":
      - /url: index.htm
  - listitem:
    - link "about":
      - /url: about.htm
  - listitem:
    - link "contact":
      - /url: contact.htm
- paragraph: Welcome Auto Bot1713462674
- heading "Account Services" [level=2]
- list:
  - listitem:
    - link "Open New Account":
      - /url: openaccount.htm
  - listitem:
    - link "Accounts Overview":
      - /url: overview.htm
  - listitem:
    - link "Transfer Funds":
      - /url: transfer.htm
  - listitem:
    - link "Bill Pay":
      - /url: billpay.htm
  - listitem:
    - link "Find Transactions":
      - /url: findtrans.htm
  - listitem:
    - link "Update Contact Info":
      - /url: updateprofile.htm
  - listitem:
    - link "Request Loan":
      - /url: requestloan.htm
  - listitem:
    - link "Log Out":
      - /url: logout.htm
- heading "Accounts Overview" [level=1]
- table:
  - rowgroup:
    - row "Account Balance* Available Amount":
      - columnheader "Account"
      - columnheader "Balance*"
      - columnheader "Available Amount"
  - rowgroup:
    - row "29217 $225.50 $225.50":
      - cell "29217":
        - link "29217":
          - /url: activity.htm?id=29217
      - cell "$225.50"
      - cell "$225.50"
    - row "30216 $290.00 $290.00":
      - cell "30216":
        - link "30216":
          - /url: activity.htm?id=30216
      - cell "$290.00"
      - cell "$290.00"
    - row "Total $515.50":
      - cell "Total"
      - cell "$515.50"
      - cell
  - rowgroup:
    - row "*Balance includes deposits that may be subject to holds":
      - cell "*Balance includes deposits that may be subject to holds"
- list:
  - listitem:
    - link "Home":
      - /url: index.htm
    - text: "|"
  - listitem:
    - link "About Us":
      - /url: about.htm
    - text: "|"
  - listitem:
    - link "Services":
      - /url: services.htm
    - text: "|"
  - listitem:
    - link "Products":
      - /url: http://www.parasoft.com/jsp/products.jsp
    - text: "|"
  - listitem:
    - link "Locations":
      - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
    - text: "|"
  - listitem:
    - link "Forum":
      - /url: http://forums.parasoft.com/
    - text: "|"
  - listitem:
    - link "Site Map":
      - /url: sitemap.htm
    - text: "|"
  - listitem:
    - link "Contact Us":
      - /url: contact.htm
- paragraph: © Parasoft. All rights reserved.
- list:
  - listitem: "Visit us at:"
  - listitem:
    - link "www.parasoft.com":
      - /url: http://www.parasoft.com/
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import userData from '../../test-data/User.json';
  3  | 
  4  | test.describe('TS-10 Session Access Scenarios', () => {
  5  | 
  6  |     test('Access Without Login', async ({ page }) => {
  7  |         await page.goto('https://parabank.parasoft.com/parabank/transfer.htm');
  8  |         // ParaBank requires authentication — login form must be visible
  9  |         await expect(page.locator('input[name="username"]')).toBeVisible();
  10 | 
  11 |         // await page.screenshot({ path: `screenshots/ts-10-test1.png`, fullPage: true });
  12 |     });
  13 | 
  14 |     test('Login Wrong Credentials', async ({ page }) => {
  15 |         await page.goto(userData.registerUser.url);
  16 |         await page.locator('input[name="username"]').fill(`nouser${Date.now()}`);
  17 |         await page.locator('input[name="password"]').fill(`nopass${Date.now()}`);
  18 |         await page.getByRole('button', { name: 'Log In' }).click();
  19 | 
> 20 |         await expect(page.locator('body')).toContainText('The username and password could not be verified.');
     |                                            ^ Error: expect(locator).toContainText(expected) failed
  21 | 
  22 |         // await page.screenshot({ path: `screenshots/ts-10-test2.png`, fullPage: true });
  23 |     });
  24 | 
  25 | });
  26 | 
```