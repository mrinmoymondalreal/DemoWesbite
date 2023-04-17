import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const QRAtom = atomWithStorage("ls",false);

export default QRAtom;