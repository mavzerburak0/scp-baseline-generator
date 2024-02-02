# SCP Baseline Generator
This tool will help you generate SCP baseline policies (custom or pre-written) by generating Cloudformation/terraform templates in real-time which you can then simply copy+paste and run on your AWS environments.

Inspired by an (idea)[https://summitroute.com/blog/2021/02/16/aws_security_project_ideas/] from Scott Piper (@0xdabbad00 on Twitter), this tool is designed to help you generate baseline SCPs for your AWS accounts in the form of CloudFormation/terraform templates.
                    
Code is really messy at the moment and I'm not proud of it, but it works. I will refactor it when I have time. I just wanted to put this out there as soon as possible. Otherwise, I would have never finished it. Hopefully someone can find it useful.

As you can see, there are many missing features and probably many bugs. Please feel free to create a pull request if you want to contribute. I would be more than happy to accept it.

If you'd like to run it in your own environment, clone this repository and run the following commands in the directory:
```
npm install
npm run dev
```

Project generated via
## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
