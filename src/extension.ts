// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { window, commands, ExtensionContext } from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "sfignore" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = commands.registerCommand('sfignore.add', async () => {
		// window.showInformationMessage('Hello VS Code from SFignore!');

		// Get metadataType from user
		let i = 0;
		const mdt = await window.showQuickPick([
			'ApexClass',
			'AppMenu',
			'AuraDefinitionBundle',
			//'CustomField',
			'CustomObject',
			//'CustomMetadata',
			'EmailTemplate',
			'FlexiPage',
			'Layout',
			'LightningComponentBundle',
			'NavigationMenu',
			'Network',
			'Portal',
			'Profile',
			'Role',
			'SiteDotCom',
			'StaticResource'
		], {
			placeHolder: 'Select metadata type',
		});

		const name = await window.showInputBox({
			value: '',
			valueSelection: [2, 4],
			placeHolder: 'API name',
		});
		const cliCmd = 'sfdx sfignore:add -n "' + name + '" -m ' + mdt + ' -r';
		window.showInformationMessage(`Running process for: ${name} (${mdt}) ->  ${cliCmd}`);

		const cp = require('child_process');
		cp.exec(cliCmd, (err:any, stdout:any, stderr:any) => {
			console.log('stdout: ' + stdout);
			if (err) {
				console.log('stderr: ' + stderr);
				console.log('error2: ' + err);
				window.showErrorMessage(stderr, err);
			} else {
				window.showInformationMessage(stdout);
			}
		});
	});


	context.subscriptions.push(disposable);
}



// this method is called when your extension is deactivated
export function deactivate() {}
