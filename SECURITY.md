# Security Policy for AI AdBlocker

## Security Support Commitment

| Version | Supported          | Security Updates Until |
|---------|--------------------|------------------------|
| 1.0.x   | :white_check_mark: | March 2025         |
| < 1.0   | :x:                |                        |

## Vulnerability Disclosure Program

### Reporting Security Issues
**Preferred Method**:  
✉️ Email: [g4lihru@students.unnes.ac.id](mailto:g4lihru@students.unnes.ac.id) (PGP Key available upon request)  
🔒 **Please include**:  
- Extension version number  
- Browser and OS version  
- Detailed reproduction steps  
- Impact analysis  

### Response Protocol
1. **Acknowledgement**: Within 48 hours of report receipt  
2. **Investigation**: Preliminary assessment within 5 business days  
3. **Patch Timeline**:  
   - Critical vulnerabilities: Patch within 7 days  
   - High severity: Patch within 14 days  
4. **Public Disclosure**: Coordinated through [GitHub Advisories](https://github.com/advisories)

### Scope Coverage
This policy applies to all components including:
- DeclarativeNetRequest rulesets (`rules.json`)
- DOM analysis engine (`dom-analyzer.js`)
- Content script injection system
- Statistical analytics subsystem

### Exclusions
The following are not covered:
- Browser-specific quirks unrelated to the extension  
- Theoretical vulnerabilities without practical exploitation  
- Issues in dependent libraries (report to upstream)

## Security Architecture
Key protection mechanisms:
1. **Sandboxed Execution**:  
   ```mermaid
   graph LR
     A[Content Script] -->|IPC| B[Background]
     B --> C[Browser APIs]
   ```
2. **Input Validation**:  
   ```javascript
   // background.js
   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
     if (!validMessageStructure(message)) {
       throw new SecurityError("Invalid message format");
     }
   });
   ```
3. **Automatic Security Audits**:  
   - Weekly dependency checks via `npm audit`  
   - Monthly static analysis using Semgrep

## Best Practices for Users
1. Always use the latest version from the Chrome Web Store  
2. Review requested permissions periodically  
3. Report suspicious behavior immediately
