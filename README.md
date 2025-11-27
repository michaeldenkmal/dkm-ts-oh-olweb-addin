# Denkmal Office Help WebAddIn für Outlook New

## testen

## Self Signed Certificate erstellen

https://github.com/FiloSottile/mkcert/releases

von downloads in C:\Prog\selfSignedCerts verschieben
```powershell
cd C:\Prog\selfSignedCerts\
.\mkcert -install

```

im Projektverzeichnis:

```powershell
mkdir certs
cd certs
C:\Prog\selfSignedCerts\mkcert.exe localhost
```

```typescript jsx
server: {
    https: {
        key: fs.readFileSync(path.resolve(__dirname, "/certs/localhost-key.pem")),
            cert: fs.readFileSync(path.resolve(__dirname, "/certs/localhost.pem"))
    },
    port: 5173
},
```


## Office AddIn Validator installieren

https://learn.microsoft.com/en-us/office/dev/add-ins/testing/troubleshoot-manifest

  npm install -g office-addin-manifest

```powershell

office-addin-manifest validate manifest.xml

```

## Ids

### ClientId

  91b0505d-8ed4-4b50-be6d-307f91137e4e

### Resource url

  api://91b0505d-8ed4-4b50-be6d-307f91137e4e

### Scopes

```xml
                <Scope>access_as_user</Scope>
            </Scopes>
        </WebApplicationInfo>

```

## url fürs hochladen als Admin

https://admin.cloud.microsoft/?#/Settings/IntegratedApps

https://admin.cloud.microsoft/?#/Settings/AddIns

# Generator für Manifest files

```powershell
npm install -g yo generator-office
```

