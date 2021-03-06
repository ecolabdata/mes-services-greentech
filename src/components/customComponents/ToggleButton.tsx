import { useState } from 'react'
import { Switch } from '@headlessui/react'
interface ToggleButtonProps { 

}

const classNames = (...classes:string[]) => {
    return classes.filter(Boolean).join(' ')
  }
const ToggleButton: React.FC<ToggleButtonProps> = (props) => { 
    
    const [enabled, setEnabled] = useState(false)

        return (
            <Switch
            checked={enabled}
            onChange={setEnabled}
            className={classNames(
                enabled ? 'bg-private-investors' : 'bg-gray-200',
                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-private-investors rounded-full cursor-pointer transition-colors ease-in-out duration-200'
            )}
            >
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={classNames(
                    enabled ? 'translate-x-5' : 'translate-x-0',
                    'mt-0.5 pointer-events-none inline-block h-5 w-5 rounded-full bg-transparent shadow transform ring-0 transition ease-in-out duration-200'
                    )}
                >
                        < span className="fr-icon-success-line h-max bg-black mt-0.5 mt-05 text-private-investors" aria-hidden="true"/>
                </span>
            </Switch>
        ) 
} 

export default ToggleButton;