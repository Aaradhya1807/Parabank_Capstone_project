# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: UI\01-register.spec.ts >> TS-01 Valid User Registration >> Register New User
- Location: tests\UI\01-register.spec.ts:7:9

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('#rightPanel')
Timeout: 5000ms
- Expected substring  -   1
+ Received string     + 119

- Your account was created successfully
+
+ 					
+
+
+
+ Signing up is easy!
+
+ If you have an account with us you can sign-up for free instant online access. You will have to provide some personal information.
+
+
+   
+     
+       First Name:
+       
+         
+       
+       
+         
+       
+     
+     
+       Last Name:
+       
+         
+       
+       
+         
+       
+     
+     
+       Address:
+       
+         
+       
+       
+         
+       
+     
+     
+       City:
+       
+         
+       
+       
+         
+       
+     
+     
+       State:
+       
+         
+       
+       
+         
+       
+     
+     
+       Zip Code:
+       
+         
+       
+       
+         
+       
+     
+     
+       Phone #:
+       
+         
+       
+       
+         
+       
+     
+     
+       SSN:
+       
+         
+       
+       
+         Social Security Number is required.
+       
+     
+      
+     
+       Username:
+       
+         
+       
+       
+         
+       
+     
+     
+       Password:
+       
+         
+       
+       
+         
+       
+     
+     
+       Confirm:
+       
+         
+       
+       
+         
+       
+         
+     
+        
+       Register
+     
+   
+   
+
+ 				

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('#rightPanel')
    13 × locator resolved to <div id="rightPanel">…</div>
       - unexpected value "
					



Signing up is easy!

If you have an account with us you can sign-up for free instant online access. You will have to provide some personal information.


  
    
      First Name:
      
        
      
      
        
      
    
    
      Last Name:
      
        
      
      
        
      
    
    
      Address:
      
        
      
      
        
      
    
    
      City:
      
        
      
      
        
      
    
    
      State:
      
        
      
      
        
      
    
    
      Zip Code:
      
        
      
      
        
      
    
    
      Phone #:
      
        
      
      
        
      
    
    
      SSN:
      
        
      
      
        Social Security Number is required.
      
    
     
    
      Username:
      
        
      
      
        
      
    
    
      Password:
      
        
      
      
        
      
    
    
      Confirm:
      
        
      
      
        
      
        
    
       
      Register
    
  
  

				"

```

```yaml
- heading "Signing up is easy!" [level=1]
- paragraph: If you have an account with us you can sign-up for free instant online access. You will have to provide some personal information.
- table:
  - rowgroup:
    - 'row "First Name: Aaradhya"':
      - cell "First Name:"
      - cell "Aaradhya":
        - textbox: Aaradhya
      - cell
    - 'row "Last Name: Singh"':
      - cell "Last Name:"
      - cell "Singh":
        - textbox: Singh
      - cell
    - 'row "Address: Jaipur"':
      - cell "Address:"
      - cell "Jaipur":
        - textbox: Jaipur
      - cell
    - 'row "City: Jaipur"':
      - cell "City:"
      - cell "Jaipur":
        - textbox: Jaipur
      - cell
    - 'row "State: Rajasthan"':
      - cell "State:"
      - cell "Rajasthan":
        - textbox: Rajasthan
      - cell
    - 'row "Zip Code: 302033"':
      - cell "Zip Code:"
      - cell "302033":
        - textbox: "302033"
      - cell
    - 'row "Phone #: 9784365061"':
      - 'cell "Phone #:"'
      - cell "9784365061":
        - textbox: "9784365061"
      - cell
    - 'row "SSN: Social Security Number is required."':
      - cell "SSN:"
      - cell:
        - textbox
      - cell "Social Security Number is required."
    - row:
      - cell
    - 'row "Username: Aaru1781569487253"':
      - cell "Username:"
      - cell "Aaru1781569487253":
        - textbox: Aaru1781569487253
      - cell
    - row "Password:":
      - cell "Password:"
      - cell:
        - textbox
      - cell
    - row "Confirm:":
      - cell "Confirm:"
      - cell:
        - textbox
      - cell
    - row "Register":
      - cell
      - cell "Register":
        - button "Register"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { RegisterPage } from '../../POM/Registerpage';
  3  | import userData from '../../test-data/User.json';
  4  | 
  5  | test.describe('TS-01 Valid User Registration', () => {
  6  | 
  7  |     test('Register New User', async ({ page }) => {
  8  |         const registerPage = new RegisterPage(page);
  9  |         const uniqueUsername = `Aaru${Date.now()}`;
  10 |         await page.goto(userData.registerUser.url);
  11 |         await registerPage.registerUser(userData.registerUser, uniqueUsername);
  12 | 
> 13 |         await expect(page.locator('#rightPanel')).toContainText('Your account was created successfully');
     |                                                   ^ Error: expect(locator).toContainText(expected) failed
  14 | 
  15 |         // await page.screenshot({ path: `screenshots/ts-01-test1.png`, fullPage: true });
  16 |     });
  17 | 
  18 |     test('Auto Login Verification', async ({ page }) => {
  19 |         const registerPage = new RegisterPage(page);
  20 |         const uniqueUsername = `Aaru${Date.now()}`;
  21 |         await page.goto(userData.registerUser.url);
  22 |         await registerPage.registerUser(userData.registerUser, uniqueUsername);
  23 | 
  24 |         await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();
  25 |         await expect(page.getByRole('link', { name: 'Open New Account' })).toBeVisible();
  26 | 
  27 |         // await page.screenshot({ path: `screenshots/ts-01-test2.png`, fullPage: true });
  28 |     });
  29 | 
  30 | });
  31 | 
```