/**
 * Test DOM API for Element:
 * - Node.prototype.isConnected
 * - Node.prototype.firstChild
 * - Node.prototype.lastChild
 * - Node.prototype.previousSibling
 * - Node.prototype.nextSibling
 * - Node.prototype.appendChild
 * - Node.prototype.removeChild
 * - Node.prototype.insertBefore
 * - Node.prototype.replaceChild
 * - ChildNode.prototype.remove
 */
describe('Node API', () => {
  it('should work', async () => {
    const el = document.createElement('div');
    expect(el.isConnected === false).toBe(true);
    document.body.appendChild(el);
    expect(el.isConnected === true).toBe(true);

    const child_0 = document.createTextNode('first child');
    el.appendChild(child_0);
    expect(el.firstChild === child_0).toBe(true);
    expect(el.lastChild === child_0).toBe(true);

    const child_1 = document.createTextNode('second child');
    el.appendChild(child_1);
    expect(child_1.previousSibling === child_0).toBe(true);
    expect(child_0.nextSibling === child_1).toBe(true);

    el.removeChild(child_0);
    const child_2 = document.createTextNode('third child');

    el.insertBefore(child_2, child_1);
    const child_3 = document.createTextNode('fourth child');
    el.replaceChild(child_3, child_1);

    await matchViewportSnapshot();
  });

  it('ChildNode.prototype.remove', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);

    expect(el.isConnected).toEqual(true);

    el.remove();

    expect(el.isConnected).toEqual(false);
  });

  it('nextSibling should to null when child is lastChild of one children list', () => {
    let container = document.createElement('div');
    let child = document.createElement('div');
    container.appendChild(child);
    document.body.appendChild(container);
    expect(container.firstChild).toBe(child, 'firstChild should be child');
    expect(container.lastChild).toBe(child, 'lastChild should be child');
    expect(child.parentNode).toBe(container, 'child parentNode should be container');
    expect(child.previousSibling).toBe(null, 'child previousSibling should be null');
    expect(child.nextSibling).toBe(null, 'child nextSibling should be null');
    expect(child.isConnected).toBe(true, 'child is connected');
  });

  it('next sibling should to null when child is lastChild of multiple children list', () => {
    let container = document.createElement('div');
    let child = document.createElement('div');
    let other = document.createElement('div');
    document.body.appendChild(container);
    container.appendChild(other);
    container.appendChild(child);
    expect(container.firstChild).toBe(other);
    expect(container.lastChild).toBe(child);
    expect(child.parentNode).toBe(container);
    expect(child.previousSibling).toBe(other);
    expect(child.nextSibling).toBe(null);
    expect(child.isConnected).toBe(true);
  });

  it('set textContent property will clear element childNodes', async () => {
    let container = createElement('div', {}, [
      createText('1234'),
      createElement('div', {}, [ createText('5678')]),
      createText('90')
    ]);
    expect(container.childNodes.length == 3);
    expect(container.textContent).toBe('1234567890');
    BODY.appendChild(container);
    await matchViewportSnapshot();
    container.textContent = '';
    expect(container.childNodes.length == 1);
    await matchViewportSnapshot();
  });
});
