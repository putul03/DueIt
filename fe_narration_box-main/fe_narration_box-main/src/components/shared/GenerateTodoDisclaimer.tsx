import React, { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'

const GenerateTodoDisclaimer = ({ onReadDisclaimer }: { onReadDisclaimer: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
        >
          How do I?
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Generating with AI
          </DialogTitle>
          <DialogDescription className='text-slate-100'>
            Some things to remember before you go all crazy on it!
          </DialogDescription>
        </DialogHeader>

        <div className='w-11/12 mx-auto flex flex-col gap-2'>
          <ol className='list-decimal'>
            <li>
              Enter whatever you want to do <br />
              (e.g. <i>I want to make presentation of effects of art history on society for my assignment and good grades.</i>)
            </li>
            <li>
              Select <span className='italic underline underline-offset-2'>granularity level</span>
              <ol className='list-decimal list-inside'>
                <li>
                  <b>Alpha</b> - will generate a basic breakdown and leave room for your decision.
                </li>
                <li>
                  <b>Beta</b> - will create a generous breakdown, detailing important steps.
                </li>
                <li>
                  <b>Sigma</b> - go all in. Totally break down your task into comprehensive and detailed todos.
                </li>
              </ol>
            </li>
          </ol>
          <div>
            <b>Do&apos;s</b>
            <ol>
              Plan. Achieve. Grow
            </ol>
          </div>
          <div>
            <b>Dont&apos;s</b>
            <ol>
              As tempting as it may be, <b>do not</b> put inappropriate or illegal prompts because it WILL break the AI :)
            </ol>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button
                onClick={() => {
                  localStorage.setItem('hasVisitedBefore', 'true')
                  onReadDisclaimer(true)
                }}
              >
                Okay, got it!
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default GenerateTodoDisclaimer
