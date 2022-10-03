#  TypeScript Compiler 




### Compiling the Entire Project / Multiple Files

`tsc --init` in the root of the project. And it creates `tsconfig.json` file.

> Note: if you've installed `typescript` locally on your machine, you can do: `npx tsc --init` to create the `tsconfig.json` file.

As soon as you have set up `tsconfig.json` file, you can run `tsc` and it will compile all your TypeScript files.



---

### Including & Excluding Files

```js
{
  "compilerOptions": {
    //...
    "target": "es5",
    "module": "commonjs"
    //...
    /* Advanced Options */
    //...
  },
  "exclude": [
    "node_modules",
    "analytics.dev.ts",
    "*.dev.ts"
  ] /* if you add any exclude, you should specify node_modules ortherwise it does it by default */,
  "include": [
    "app.ts"
  ] /* if you use include, we need to include ALL the files/folders we want */,
  "files": [
    "app.js"
  ] /* files is similar to include but only accept files and not folders */
}
```

---

### Setting a Compilation Target

```js
{
  "compilerOptions": {
    //...
    "target": "es5",
    "module": "commonjs"
    //...
  }
}
```


---

### Source Maps

The map files generated act as a **bridge** in the modern browsers and the developer tools to connect the JS files to the input TS files. **We can even breakpoint in our TS file.**

```js
{
  "compilerOptions": {
    //...
    "sourceMap": true
    //...
  }
}
```

---

### rootDir and outDir

```js
{
  "compilerOptions": {
    //...
    "outDir": "./dist",
    "rootDir": "./src"
    //...
  }
}
```

---

### Stop Emitting Files on Compilation Errors

`noEmitOnError` prevents code to be compiled if there is an error.

```js
{
  "compilerOptions": {
    //...
    "noEmitOnError": true /* default is false */
    //...
  }
}
```



---

### Debugging 


```js
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:3000", // same as the server you're running
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

Note: the port for the `url` 
