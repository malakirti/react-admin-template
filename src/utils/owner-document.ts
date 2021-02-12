export default function ownerDocument(node?: Node | null): Document {
	return (node && node.ownerDocument) || document;
}
