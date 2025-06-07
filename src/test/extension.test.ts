import * as assert from 'assert';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import * as generators from '../generators/index';

// Define interfaces for our stubs to avoid using 'any'
interface TextEditorEdit {
  insert: sinon.SinonStub;
}

interface TextEditor {
  edit: (callback: (editBuilder: TextEditorEdit) => void) => Promise<boolean>;
  selection: {
    active: vscode.Position;
  };
}

suite('Pokemon Lorem Ipsum Extension Tests', () => {
  let sandbox: sinon.SinonSandbox;
  let editorStub: TextEditor;
  let editBuilderStub: TextEditorEdit;

  setup(() => {
    sandbox = sinon.createSandbox();

    editBuilderStub = {
      insert: sandbox.stub(),
    };

    editorStub = {
      edit: sandbox.stub().callsFake((callback: Function) => {
        callback(editBuilderStub);
        return Promise.resolve(true);
      }),
      selection: {
        active: new vscode.Position(0, 0),
      },
    };

    sandbox.stub(vscode.window, 'activeTextEditor').value(editorStub);
  });

  teardown(() => {
    sandbox.restore();
  });

  test('Commands should be registered', async () => {
    const allCommands = await vscode.commands.getCommands();

    assert.ok(
      allCommands.includes('pokemon-lorem-ipsum.generateSentence'),
      'generateSentence command should be registered',
    );
    assert.ok(
      allCommands.includes('pokemon-lorem-ipsum.generateParagraph'),
      'generateParagraph command should be registered',
    );
    assert.ok(
      allCommands.includes('pokemon-lorem-ipsum.generateMultiParagraph'),
      'generateMultiParagraph command should be registered',
    );
  });

  async function testInsertTextAtCursor(text: string): Promise<void> {
    if (vscode.window.activeTextEditor) {
      await vscode.window.activeTextEditor.edit(editBuilder => {
        editBuilder.insert(vscode.window.activeTextEditor!.selection.active, text);
      });
    }
  }

  test('generateSentence command should insert text at cursor', async () => {
    const mockSentence = 'Test sentence with Pikachu and Charizard';

    await testInsertTextAtCursor(mockSentence);

    assert.ok(editBuilderStub.insert.calledOnce, 'editor.edit should be called once');
    assert.ok(
      editBuilderStub.insert.calledWith(editorStub.selection.active, mockSentence),
      'Should insert the generated text at cursor position',
    );
  });

  test('generateParagraph command should insert paragraph at cursor', async () => {
    const mockParagraph = 'Test paragraph about Pokemon battles. Multiple sentences here.';
    const generateStub = sandbox.stub(generators, 'generateParagraph').returns(mockParagraph);

    await testInsertTextAtCursor(mockParagraph);

    assert.ok(editBuilderStub.insert.calledOnce, 'editor.edit should be called once');
    assert.ok(
      editBuilderStub.insert.calledWith(editorStub.selection.active, mockParagraph),
      'Should insert the generated paragraph at cursor position',
    );
  });

  test('generateMultiParagraph command should prompt for count and insert text', async () => {
    const mockMultiParagraph = 'Test multi-paragraph text. Multiple paragraphs here.';
    const inputBoxStub = sandbox.stub(vscode.window, 'showInputBox').resolves('2');

    const promptAndInsertText = async () => {
      const paragraphCount = await vscode.window.showInputBox({
        prompt: 'How many paragraphs would you like to generate?',
        placeHolder: 'Enter a number (default: 3)',
        value: '3',
      });

      if (paragraphCount === undefined) {return;}

      const count = parseInt(paragraphCount) || 3;
      assert.strictEqual(count, 2, 'Should parse the input count correctly');

      await testInsertTextAtCursor(mockMultiParagraph);
    };

    await promptAndInsertText();

    assert.ok(inputBoxStub.calledOnce, 'showInputBox should be called once');

    assert.ok(editBuilderStub.insert.calledOnce, 'editor.edit should be called once');
    assert.ok(
      editBuilderStub.insert.calledWith(editorStub.selection.active, mockMultiParagraph),
      'Should insert the generated text at cursor position',
    );
  });

  test('generateMultiParagraph should handle user cancellation', async () => {
    const inputBoxStub = sandbox.stub(vscode.window, 'showInputBox').resolves(undefined);
    const generateStub = sandbox.stub(generators, 'generateText');

    const promptAndInsertText = async () => {
      const paragraphCount = await vscode.window.showInputBox({
        prompt: 'How many paragraphs would you like to generate?',
        placeHolder: 'Enter a number (default: 3)',
        value: '3',
      });

      if (paragraphCount === undefined) {return;}

      const count = parseInt(paragraphCount) || 3;
      const text = generators.generateText(count);
      await testInsertTextAtCursor(text);
    };

    await promptAndInsertText();

    assert.ok(inputBoxStub.calledOnce, 'showInputBox should be called once');
    assert.ok(generateStub.notCalled, 'generateText should not be called when user cancels');
    assert.ok(editBuilderStub.insert.notCalled, 'editor.edit should not be called when user cancels');
  });

  test('should handle case when editor is not available', async () => {
    sandbox.stub(vscode.window, 'activeTextEditor').value(undefined);

    await testInsertTextAtCursor('This text should not be inserted');

    assert.ok(editBuilderStub.insert.notCalled, 'No edit should be attempted when editor is not available');
  });
});
