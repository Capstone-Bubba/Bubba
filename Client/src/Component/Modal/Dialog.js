import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DraggableDialog(props) {
    const { children, onClose, openPopup, data } = props;
    return (
        <div>
            <Dialog
                open={openPopup}
                onClose={onClose}
                aria-labelledby="draggable-dialog-title"
            >
               
                            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                                
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    {children}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button onClick={onClose}>Subscribe</Button>
                            </DialogActions>
                 

            </Dialog>
        </div>
    );
}
