// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';

// Import the text generation functions from our new module
import {
  generateRandomSentence,
  generateParagraph,
  generateText,
} from './generators';

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
  // Register the commands
  const generateSentenceCmd = vscode.commands.registerCommand('pokemon-lorem-ipsum.generateSentence', async () => {
    const text = generateRandomSentence();

    const editor = vscode.window.activeTextEditor;
    if (editor) {
      editor.edit(editBuilder => {
        editBuilder.insert(editor.selection.active, text);
      });
    }
  });

  const generateParagraphCmd = vscode.commands.registerCommand('pokemon-lorem-ipsum.generateParagraph', async () => {
    const text = generateParagraph();

    const editor = vscode.window.activeTextEditor;
    if (editor) {
      editor.edit(editBuilder => {
        editBuilder.insert(editor.selection.active, text);
      });
    }
  });

  const generateMultiParagraphCmd = vscode.commands.registerCommand('pokemon-lorem-ipsum.generateMultiParagraph', async () => {
    const paragraphCount = await vscode.window.showInputBox({
      prompt: 'How many paragraphs would you like to generate?',
      placeHolder: 'Enter a number (default: 3)',
      value: '3',
    });

    if (paragraphCount === undefined) {return;} // User cancelled

    const count = parseInt(paragraphCount) || 3;
    const text = generateText(count);

    const editor = vscode.window.activeTextEditor;
    if (editor) {
      editor.edit(editBuilder => {
        editBuilder.insert(editor.selection.active, text);
      });
    }
  });

  context.subscriptions.push(generateSentenceCmd);
  context.subscriptions.push(generateParagraphCmd);
  context.subscriptions.push(generateMultiParagraphCmd);
}

// This method is called when your extension is deactivated
export function deactivate() {}
